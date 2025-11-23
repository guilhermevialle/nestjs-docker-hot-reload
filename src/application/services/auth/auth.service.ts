import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { type RedisClientType } from 'redis';
import { ConflictError } from 'src/application/errors/conflict.error';
import { InvalidCredentialsError } from 'src/application/errors/invalid-credentials.error';
import { User } from 'src/domain/entities/user.entity';
import { EmailProducer } from 'src/infra/queues/email/email.producer';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { AuthenticateUserDto } from './dtos/authenticate-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailProducer: EmailProducer,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    @Inject('RedisClient') private readonly redis: RedisClientType,
  ) {}

  async authenticate(dto: AuthenticateUserDto) {
    const user = await this.userRepo.findByUsername(dto.username);

    if (!user) {
      this.logger.warn('Login failed: user not found', {
        username: dto.username,
      });

      throw new InvalidCredentialsError(`Invalid username or password.`);
    }

    const ok = await bcrypt.compare(dto.password, user.password);

    if (!ok) throw new InvalidCredentialsError(`Invalid username or password.`);

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const cachedAccessToken = await this.redis.get(`access:${user.id}`);
    const cachedRefreshToken = await this.redis.get(`refresh:${user.id}`);

    if (cachedAccessToken && cachedRefreshToken) {
      return {
        user: {
          id: user.id,
          username: user.username,
        },
        auth: {
          accessToken: cachedAccessToken,
          refreshToken: cachedRefreshToken,
        },
      };
    }

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.redis.set(`access:${user.id}`, accessToken, { EX: 60 * 3 });
    await this.redis.set(`refresh:${user.id}`, refreshToken, {
      EX: 60 * 60 * 24 * 7,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
      },
      auth: {
        accessToken,
        refreshToken,
      },
    };
  }

  async register(dto: RegisterUserDto): Promise<User> {
    const hasUser = await this.userRepo.findByUsername(dto.username);

    if (hasUser) throw new ConflictError(`User already exists.`);

    const password = await bcrypt.hash(dto.password, 10);

    const user = User.create({ username: dto.username, password });

    return await this.userRepo.saveOne(user);
  }
}

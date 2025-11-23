import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictError } from 'src/application/errors/conflict.error';
import { InvalidCredentialsError } from 'src/application/errors/invalid-credentials.error';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { AuthenticateUserDto } from './dtos/authenticate-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(dto: AuthenticateUserDto) {
    const user = await this.userRepo.findByUsername(dto.username);

    if (!user)
      throw new InvalidCredentialsError(`Invalid username or password.`);

    const ok = await bcrypt.compare(dto.password, user.password);

    if (!ok) throw new InvalidCredentialsError(`Invalid username or password.`);

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
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

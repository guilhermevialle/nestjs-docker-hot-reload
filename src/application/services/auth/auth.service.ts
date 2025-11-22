import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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

    if (!user) throw new Error('Invalid username or password.');

    const ok = await bcrypt.compare(dto.password, user.password);

    if (!ok) throw new Error('Invalid username or password.');

    const token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        profile: {
          displayName: user.profile.displayName,
          summary: user.profile.summary,
        },
      },
      auth: {
        token,
      },
    };
  }

  async register(dto: RegisterUserDto) {}
}

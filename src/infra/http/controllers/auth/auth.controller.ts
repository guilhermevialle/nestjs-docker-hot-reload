import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/application/services/auth/auth.service';
import { AuthenticateUserDto } from 'src/application/services/auth/dtos/authenticate-user.dto';
import { RegisterUserDto } from 'src/application/services/auth/dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async authenticate(@Body() dto: AuthenticateUserDto) {
    return await this.authService.authenticate(dto);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }
}

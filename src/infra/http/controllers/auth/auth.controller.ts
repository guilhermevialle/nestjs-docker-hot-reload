import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { type Request } from 'express';
import { AuthService } from 'src/application/services/auth/auth.service';
import { AuthenticateUserDto } from 'src/application/services/auth/dtos/authenticate-user.dto';
import { RegisterUserDto } from 'src/application/services/auth/dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async authenticate(@Body() dto: AuthenticateUserDto, @Req() req: Request) {
    return await this.authService.authenticate(dto);
  }

  @Post('register')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }
}

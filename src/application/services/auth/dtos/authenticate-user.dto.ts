import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

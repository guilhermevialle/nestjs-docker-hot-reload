import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 80)
  password: string;
}

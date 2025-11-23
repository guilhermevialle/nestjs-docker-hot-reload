import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserProfile } from 'src/application/use-cases/user/get-profile';

@Controller('users')
export class UserController {
  constructor(private readonly getProfileUc: GetUserProfile) {}

  @Get(':id/profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Param('id') id: string) {
    return await this.getProfileUc.execute(id);
  }
}

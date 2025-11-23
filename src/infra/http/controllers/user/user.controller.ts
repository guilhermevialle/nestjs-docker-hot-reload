import { Controller, Get, Param } from '@nestjs/common';
import { GetUserProfile } from 'src/application/use-cases/user/get-profile';

@Controller('users')
export class UserController {
  constructor(private readonly getProfileUc: GetUserProfile) {}

  @Get(':id/profile')
  async getProfile(@Param('id') id: string) {
    return await this.getProfileUc.execute(id);
  }
}

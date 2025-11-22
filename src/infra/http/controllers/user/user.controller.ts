import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/application/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }
}

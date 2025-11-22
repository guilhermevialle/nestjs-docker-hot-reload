import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getAll() {
    return await this.userRepo.findAll();
  }
}

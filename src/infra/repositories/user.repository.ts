import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
  async findAll() {
    return await this.find();
  }

  async findByUsername(username: string) {
    return await this.findOne({ where: { username } });
  }

  async findById(id: string) {
    return await this.findOne({ where: { id } });
  }
}

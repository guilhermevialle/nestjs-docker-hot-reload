import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly orm: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.orm.find();
  }

  async saveOne(user: User): Promise<User> {
    return await this.orm.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.orm.findOne({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.orm.findOne({ where: { id } });
  }
}

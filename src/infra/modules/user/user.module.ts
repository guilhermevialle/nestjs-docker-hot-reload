import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/application/services/user/user.service';
import { User } from 'src/domain/entities/user.entity';
import { UserController } from 'src/infra/http/controllers/user/user.controller';
import { UserRepository } from 'src/infra/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

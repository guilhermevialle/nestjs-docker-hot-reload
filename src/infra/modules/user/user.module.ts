import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUserProfile } from 'src/application/use-cases/user/get-profile';
import { User } from 'src/domain/entities/user.entity';
import { UserController } from 'src/infra/http/controllers/user/user.controller';
import { UserRepository } from 'src/infra/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository, GetUserProfile],
  exports: [UserRepository],
})
export class UserModule {}

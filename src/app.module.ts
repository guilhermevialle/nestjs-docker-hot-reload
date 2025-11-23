import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresTypeOrmModule } from './infra/db/postgres-typeorm/postgres-typeorm.module';
import { AuthModule } from './infra/modules/auth/auth.module';
import { UserModule } from './infra/modules/user/user.module';
import { RedisModule } from './infra/modules/redis/redis.module';

@Module({
  imports: [PostgresTypeOrmModule, UserModule, AuthModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

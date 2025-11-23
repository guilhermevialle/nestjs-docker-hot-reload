import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresTypeOrmModule } from './infra/db/postgres-typeorm/postgres-typeorm.module';
import { AuthModule } from './infra/modules/auth/auth.module';
import { BullMqModule } from './infra/modules/bullmq/bullmq.module';
import { RedisModule } from './infra/modules/redis/redis.module';
import { UserModule } from './infra/modules/user/user.module';
import { WinstonLoggerModule } from './infra/modules/winston-logger/winston-logger.module';

@Module({
  imports: [
    PostgresTypeOrmModule,
    UserModule,
    AuthModule,
    RedisModule,
    WinstonLoggerModule,
    BullMqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

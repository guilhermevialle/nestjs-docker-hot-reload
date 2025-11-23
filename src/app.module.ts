import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailService } from './application/services/mail/mail.service';
import { PostgresTypeOrmModule } from './infra/db/postgres-typeorm/postgres-typeorm.module';
import { AuthModule } from './infra/modules/auth/auth.module';
import { MailQueueModule } from './infra/modules/mail-queue/mail-queue.module';
import { MailModule } from './infra/modules/mail/mail.module';
import { RedisModule } from './infra/modules/redis/redis.module';
import { UserModule } from './infra/modules/user/user.module';

@Module({
  imports: [
    PostgresTypeOrmModule,
    UserModule,
    AuthModule,
    RedisModule,
    MailQueueModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}

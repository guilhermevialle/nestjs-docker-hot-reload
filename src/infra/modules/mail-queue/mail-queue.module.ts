import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { MailQueueConsumer } from './mail-queue.consumer';
import { MailQueueProducer } from './mail-queue.producer';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({ name: 'mail' }),
    MailModule,
  ],
  providers: [MailQueueProducer, MailQueueConsumer],
  exports: [MailQueueProducer],
})
export class MailQueueModule {}

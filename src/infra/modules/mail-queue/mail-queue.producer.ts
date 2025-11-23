import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MailQueueProducer {
  constructor(@InjectQueue('mail') private queue: Queue) {}

  async warnAccessFromAnotherDevice(email: string) {
    await this.queue.add('warn-access-from-another-device', {
      email,
      body: `We have detected an attempt to access your account from another device.
             If this was not you, please change your password immediately.`,
    });
  }
}

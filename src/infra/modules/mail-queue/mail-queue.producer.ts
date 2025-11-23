import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

export interface WarnAccessFromAnotherDevice {
  email: string;
  ipAddress: string;
  userAgent: string;
  occurredAt: Date;
}

@Injectable()
export class MailQueueProducer {
  private readonly logger = new Logger(MailQueueProducer.name);

  constructor(@InjectQueue('mail') private queue: Queue) {}

  async warnAccessFromAnotherDevice(data: WarnAccessFromAnotherDevice) {
    this.logger.debug('[MailQueueProducer]: Warn access from another device');

    await this.queue.add('warn-access-from-another-device', {
      email: data.email,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      occurredAt: data.occurredAt,
    });
  }
}

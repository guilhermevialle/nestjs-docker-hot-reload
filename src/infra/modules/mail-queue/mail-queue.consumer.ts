import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailService } from 'src/application/services/mail/mail.service';
import { WarnAccessFromAnotherDevice } from './mail-queue.producer';

@Processor('mail')
export class MailQueueConsumer extends WorkerHost {
  private readonly logger = new Logger(MailQueueConsumer.name);

  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job) {
    if (job.name === 'warn-access-from-another-device') {
      this.logger.debug(
        `[MailQueueConsumer]: Processing job 'warn-access-from-another-device' with data ${JSON.stringify(job.data, null, 2)}`,
      );

      const data = job.data as WarnAccessFromAnotherDevice;

      await this.mailService.warnAccess({
        email: data.email,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        occurredAt: data.occurredAt,
      });
    }
  }
}

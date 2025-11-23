import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('mail')
export class MailQueueConsumer extends WorkerHost {
  async process(job: Job) {
    if (job.name === 'send-welcome-email') {
      console.log('[MailQueueConsumer] send-welcome-email');
    }

    if (job.name === 'warn-access-from-another-device') {
      const data = job.data as {
        email: string;
        body: string;
      };

      console.log(`[MailQueueConsumer]: ${data.email} => ${data.body}`);
    }
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { WarnAccessFromAnotherDevice } from 'src/infra/modules/mail-queue/mail-queue.producer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly logger = new Logger(MailService.name);

  async warnAccess(data: WarnAccessFromAnotherDevice) {
    this.logger.debug(
      `[MailService]: Sending email about access warning to ${data.email}`,
    );

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Access Warning',
      html: `
        <p>We have detected an attempt to access your account from another device.</p>
        <p>If this was not you, please change your password immediately.</p>
        <p>IP Address: ${data.ipAddress}</p>
        <p>User Agent: ${data.userAgent}</p>
        <p>Occurred At: ${data.occurredAt}</p>
      `,
    });
  }
}

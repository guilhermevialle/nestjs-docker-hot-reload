import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { MailService } from 'src/application/services/mail/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        secure: false,
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

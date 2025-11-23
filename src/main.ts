import { MailerService } from '@nestjs-modules/mailer';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './common/filters/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mailer = app.get(MailerService);
  try {
    await mailer.sendMail({
      to: 'test@example.com',
      subject: 'TEST',
      html: '<h1>OK</h1>',
    });
    console.log('ENVIADO');
  } catch (e) {
    console.log('ERRO SMTP >>>');
    console.log(e);
  }

  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

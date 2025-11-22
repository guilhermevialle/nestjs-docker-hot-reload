import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './domain/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const user = User.create({ username: 'John Doe' });

  console.log({
    username: user.username,
    profile: {
      displayName: user.profile.displayName,
      summary: user.profile.summary,
    },
  });

  user.changeProfileData({ displayName: 'Guilherme Vialle' });

  console.log({
    username: user.username,
    profile: {
      displayName: user.profile.displayName,
      summary: user.profile.summary,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

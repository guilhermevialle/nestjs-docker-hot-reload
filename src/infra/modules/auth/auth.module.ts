import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/application/services/auth/auth.service';
import { JwtStrategy } from 'src/infra/auth/strategies/jwt.strategy';
import { AuthController } from 'src/infra/http/controllers/auth/auth.controller';
import { MailQueueModule } from '../mail-queue/mail-queue.module';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    RedisModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '3m' },
    }),
    MailQueueModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

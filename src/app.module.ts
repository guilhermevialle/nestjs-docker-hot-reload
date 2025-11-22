import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetupTypeOrmModule } from './infra/db/setup-type-orm/setup-type-orm.module';
import { AuthModule } from './infra/modules/auth/auth.module';
import { UserModule } from './infra/modules/user/user.module';

@Module({
  imports: [SetupTypeOrmModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OrmModule } from './modules/orm/orm.module';
import { UserModule } from './modules/user/user.module';
import { SpacesModule } from './modules/spaces/spaces.module';

@Module({
  imports: [AuthModule, OrmModule, UserModule, SpacesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

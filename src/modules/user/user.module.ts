import { Module } from '@nestjs/common';
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [User, UserService],
    exports: [UserService],
    controllers: [UserController]
  })
export class UserModule {}

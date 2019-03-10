import { Module } from '@nestjs/common';
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from './entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [User, Role, UserService],
    exports: [UserService],
    controllers: [UserController]
  })
export class UserModule {}

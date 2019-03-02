import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/spaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  providers: [Space, SpaceService],
  exports: [SpaceService],
  controllers: [SpaceController]
})
export class SpacesModule {}

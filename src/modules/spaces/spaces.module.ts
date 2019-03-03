import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity])],
  providers: [SpaceEntity, SpaceService],
  exports: [SpaceService],
  controllers: [SpaceController]
})
export class SpacesModule {}

import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { SpaceModel } from './models/space.model';
import { SpaceTypeEntity } from './entities/spaceType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity, SpaceTypeEntity])],
  providers: [SpaceEntity, SpaceTypeEntity, SpaceService, SpaceModel],
  exports: [SpaceService],
  controllers: [SpaceController]
})
export class SpacesModule {}

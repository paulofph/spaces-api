import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { SpaceModel } from './models/space.model';
import { SpaceTypeEntity } from './entities/space.type.entity';
import { SpaceCommodityEntity } from './entities/space.commodity.entity';
import { SpaceTraderTypeEntity } from './entities/space.trader.type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity, SpaceTypeEntity, SpaceCommodityEntity])],
  providers: [SpaceEntity, SpaceTypeEntity, SpaceTraderTypeEntity, SpaceCommodityEntity, SpaceService, SpaceModel],
  exports: [SpaceService],
  controllers: [SpaceController]
})
export class SpacesModule {}

import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { SpaceModel, SpaceLocationModel } from './models/space.model';
import { SpaceTypeEntity } from './entities/space.type.entity';
import { SpaceCommodityEntity } from './entities/space.commodity.entity';
import { SpaceTraderTypeEntity } from './entities/space.trader.type.entity';
import { SpaceLocationEntity } from './entities/spaces.location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity, SpaceTraderTypeEntity, SpaceTypeEntity, SpaceCommodityEntity, SpaceLocationEntity])],
  providers: [SpaceEntity, SpaceTypeEntity, SpaceTraderTypeEntity, SpaceCommodityEntity, SpaceLocationEntity, SpaceService, SpaceModel, SpaceLocationModel],
  exports: [SpaceService],
  controllers: [SpaceController]
})
export class SpacesModule {}

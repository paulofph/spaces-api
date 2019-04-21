import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { Repository, getConnection } from 'typeorm';
import { SpaceModel } from './models/space.model';
import { SpaceFilter } from './models/space-filter';
import { SpaceTypeEntity } from './entities/space.type.entity';
import { SpaceCommodityEntity } from './entities/space.commodity.entity';
import {getRepository} from "typeorm";
import { SpaceTraderTypeEntity } from './entities/space.trader.type.entity';
import { SpaceLocationEntity } from './entities/spaces.location.entity';

@Injectable()
export class SpaceService {
    constructor(
        @InjectRepository(SpaceEntity)
        private spaceRepository: Repository<SpaceEntity>,
        @InjectRepository(SpaceTypeEntity)
        private spaceTypeRepository: Repository<SpaceTypeEntity>,
        @InjectRepository(SpaceTraderTypeEntity)
        private spaceTraderTypeRepository: Repository<SpaceTraderTypeEntity>,
        @InjectRepository(SpaceCommodityEntity)
        private spaceCommodityRepository: Repository<SpaceCommodityEntity>,
        @InjectRepository(SpaceLocationEntity)
        private spaceLocationRepository: Repository<SpaceLocationEntity>
    ) { }

    async findAll(spaceFilter: SpaceFilter): Promise<any> {
        const spaces = [];
        const origin = `${spaceFilter.location.longitude}, ${spaceFilter.location.latitude}`
        let query = `
            SELECT id ,ST_X(coordinates) as longitude, ST_Y(coordinates) as latitude FROM public.space_location
                WHERE ST_DWithin(coordinates, ST_MakePoint(${origin})::geography, ${spaceFilter.radius * 1000} );
        `

        let response = await this.spaceLocationRepository.query(query);
        const ids = response.map(space => space.id );

        response = await getConnection().createQueryBuilder(SpaceEntity, "space")
            .leftJoinAndSelect("space.locationNew", "locationNew")
            .where("space.location_new_id IN (:...spaces)", { spaces: ids })
            .getMany();

        response.forEach(el => {
            const space = new SpaceModel(el)
            spaces.push(space) 
        });
        return spaces;
    }

    async find(id) {
        const result = await this.spaceRepository.findOne({ 
            where: { id },
            relations: ["commodities", "type"]
        })
        if(!result)
            throw new Error()

        return new SpaceModel(result)
    }

    async saveSpace(space: SpaceModel) {
        const {id} = await this.spaceRepository
            .save(new SpaceEntity(space));
            
        return await this.find(id)
    }

    async getTypes() {
        return await this.spaceTypeRepository.find()
    }

    async getTraderTypes() {
        return await this.spaceTraderTypeRepository.find()
    }

    async getCommodities() {
        return await this.spaceCommodityRepository.find()
    }

    async getSpace( ){
        return await this.spaceRepository.find()
    }
}

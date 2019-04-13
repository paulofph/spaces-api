import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { Repository } from 'typeorm';
import { SpaceModel } from './models/space.model';
import { SpaceFilter } from './models/space-filter';
import { SpaceTypeEntity } from './entities/space.type.entity';
import { SpaceCommodityEntity } from './entities/space.commodity.entity';
import {getRepository} from "typeorm";
import { SpaceTraderTypeEntity } from './entities/space.trader.type.entity';

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
    ) { }

    async findAll(spaceFilter: SpaceFilter): Promise<any> {
        const spaces = [];
        const origin = `${spaceFilter.location.longitude}, ${spaceFilter.location.latitude}`
        const query = `
            SELECT id ,ST_X(location) as longitude, ST_Y(location) as latitude FROM public.space
                WHERE ST_DWithin(location, ST_MakePoint(${origin})::geography, ${spaceFilter.radius * 1000} );
        `
        let response = await this.spaceRepository.query(query);
        const ids = response.map(space => space.id );

        response = await getRepository(SpaceEntity)
            .createQueryBuilder("space")
            .where("space.id IN (:...id)", { id: ids })
            .getMany();

        response.forEach(el => {
            const space = new SpaceModel(el)
            spaces.push(space) 
        });
        return spaces;
    }

    async find(id) {
        const result = await this.spaceRepository.findOne({ 
            where: {id},
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

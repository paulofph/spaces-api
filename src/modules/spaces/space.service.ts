import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { Repository } from 'typeorm';
import { SpaceModel } from './models/space.model';
import { SpaceFilter } from './models/space-filter';
import { SpaceTypeEntity } from './entities/space.type.entity';
import { SpaceCommodityEntity } from './entities/space.commodity.entity';

@Injectable()
export class SpaceService {
    constructor(
        @InjectRepository(SpaceEntity)
        private spaceRepository: Repository<SpaceEntity>,
        @InjectRepository(SpaceTypeEntity)
        private spaceTypeRepository: Repository<SpaceTypeEntity>,
        @InjectRepository(SpaceCommodityEntity)
        private spaceCommodityRepository: Repository<SpaceCommodityEntity>,
    ) { }

    async findAll(spaceFilter: SpaceFilter): Promise<any> {
        const spaces = [];
        const origin = `${spaceFilter.location.longitude}, ${spaceFilter.location.latitude}`
        const query = `
            SELECT ST_X(location) as longitude, ST_Y(location) as latitude FROM public.space
                WHERE ST_DWithin(location, ST_MakePoint(${origin})::geography, ${spaceFilter.radius * 1000} );
        `
        const response = await this.spaceRepository.query(query);
        response.forEach(el => {
            const space = new SpaceModel()
            space.location.latitude = el.latitude;
            space.location.longitude = el.longitude;
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

    async getCommodities() {
        return await this.spaceCommodityRepository.find()
    }

    async getSpace( ){
        return await this.spaceRepository.find()
    }
}

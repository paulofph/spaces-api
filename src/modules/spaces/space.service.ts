import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { Repository } from 'typeorm';
import { SpaceModel } from './models/space.mode';
import { SpaceFilter } from './models/space-filter';

@Injectable()
export class SpaceService {
    constructor(
        @InjectRepository(SpaceEntity)
        private spaceRepository: Repository<SpaceEntity>,
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
        return this.spaceRepository
        .createQueryBuilder("space")
        .select("ST_X(location)", "longitude")
        .select("ST_Y(location)", "latitude")
        .where("ST_Distance(space.location, ST_GeomFromGeoJSON(:origin)) > 0")
        .setParameters({ origin: JSON.stringify(origin) })
        .getMany()

        return this.spaceRepository
            .createQueryBuilder("space")
            .where("ST_Distance(space.location, ST_GeomFromGeoJSON(:origin)) > 0")
            .setParameters({ origin: JSON.stringify(origin) })
            .getMany()
    }
}

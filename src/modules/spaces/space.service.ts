import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from './entities/spaces.entity';
import { Repository } from 'typeorm';
import { SpaceModel } from './models/space.mode';

@Injectable()
export class SpaceService {
    constructor(
        @InjectRepository(SpaceEntity)
        private spaceRepository: Repository<SpaceEntity>,
    ) { }

    async findAll(): Promise<any> {
        const spaces = [];
        const origin = '-8.816610, 39.746371'
        const radius = 10 // Km

        const query = `
            SELECT ST_X(location) as longitude, ST_Y(location) as latitude FROM public.space 
                WHERE ST_DWithin(location, ST_MakePoint(${origin})::geography, ${radius * 1000} );
        `
        const response = await this.spaceRepository.query(query);

        response.forEach(el => {
            const space = new SpaceModel()
            space.location.latitude = el.latitude;
            space.location.longitude = el.longitude;
            spaces.push(space) 
        });

        return spaces;
            // .createQueryBuilder("space")
            // .where("ST_Distance(space.point, ST_GeomFromGeoJSON(:origin)) > 0")
            // // .orderBy({
            // //     "ST_Distance(space.point, ST_GeomFromGeoJSON(:origin))": {
            // //         order: "ASC",
            // //         nulls: "NULLS FIRST"
            // //     }
            // // })
            // .setParameters({ origin: JSON.stringify(origin) })
            // .getMany()
    }
}

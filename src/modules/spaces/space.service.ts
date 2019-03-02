import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './entities/spaces.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpaceService {
    constructor(
        @InjectRepository(Space)
        private spaceRepository: Repository<Space>,
    ) { }

    async findAll(): Promise<any> {
        const origin = '-8.816610, 39.746371'
        const radius = 10 // Km

        const query = `
            SELECT * FROM public.space 
                WHERE ST_DWithin(point, ST_MakePoint(${origin})::geography, ${radius * 1000} );
        `

        return await this.spaceRepository.query(query);
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

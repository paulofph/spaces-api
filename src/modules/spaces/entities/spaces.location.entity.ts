import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { SpaceModel, SpaceLocationModel } from '../models/space.model';
import * as wkt from "terraformer-wkt-parser";
import { SpaceTypeEntity } from './space.type.entity';
import { SpaceCommodityEntity } from './space.commodity.entity';
import { SpaceTraderTypeEntity } from './space.trader.type.entity';

@Entity({name: "space_location"})
export class SpaceLocationEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("geometry", { nullable: true })
    @Index({ spatial: true })
    coordinates: object;

    constructor(
        public location?: SpaceLocationModel
    ) {
        if(location && location.longitude && location.latitude)
            this.coordinates = wkt.parse(`POINT(${location.longitude} ${location.latitude})`);
    }
}
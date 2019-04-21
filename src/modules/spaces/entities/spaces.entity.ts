import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { SpaceModel } from '../models/space.model';
import * as wkt from "terraformer-wkt-parser";
import { SpaceTypeEntity } from './space.type.entity';
import { SpaceCommodityEntity } from './space.commodity.entity';
import { SpaceTraderTypeEntity } from './space.trader.type.entity';
import { SpaceLocationEntity } from './spaces.location.entity';

@Entity({name: "space"})
export class SpaceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string

    @Column({ nullable: true })
    description: string

    @Column({ name: 'available_places', nullable: true })
    availablePlaces: number

    @ManyToOne(type => SpaceTypeEntity)
    @JoinColumn({ name: 'type_id'})
    type: SpaceTypeEntity;

    @ManyToOne(type => SpaceTraderTypeEntity)
    @JoinColumn({ name: 'trader_type_id'})
    traderType: SpaceTraderTypeEntity;

    @ManyToMany(type => SpaceCommodityEntity)
    @JoinTable()
    commodities: SpaceCommodityEntity[];

    @OneToOne(type => SpaceLocationEntity, location => location.coordinates, {
        cascade: true
    })
    @JoinColumn({ name: 'location_id'})
    location: SpaceLocationEntity;

    constructor(
        public space?: SpaceModel
    ) {      
        for (let key in space) {
            this[key] = space[key];
        }
        if(space && space.location.longitude && space.location.latitude) {
            this.location = new SpaceLocationEntity();
            this.location.coordinates = wkt.parse(`POINT(${space.location.longitude} ${space.location.latitude})`);
        }
    }
}
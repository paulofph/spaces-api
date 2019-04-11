import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { SpaceModel } from '../models/space.model';
import * as wkt from "terraformer-wkt-parser";
import { SpaceTypeEntity } from './space.type.entity';
import { SpaceCommodityEntity } from './space.commodity.entity';
import { SpaceTraderTypeEntity } from './space.trader.type.entity';

@Entity({name: "space"})
export class SpaceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    availablePlaces: number
    
    @Column("geometry", { nullable: true })
    @Index({ spatial: true })
    location: object;

    @ManyToOne(type => SpaceTypeEntity)
    @JoinColumn()
    type: SpaceTypeEntity;

    @ManyToOne(type => SpaceTypeEntity)
    @JoinColumn()
    traderType: SpaceTraderTypeEntity;

    @ManyToMany(type => SpaceCommodityEntity)
    @JoinTable()
    commodities: SpaceCommodityEntity[];

    constructor(
        public space?: SpaceModel
    ) {      
        for (let key in space) {
            this[key] = space[key];
        }
        if(space && space.location.longitude && space.location.latitude)
            this.location = wkt.parse(`POINT(${space.location.longitude} ${space.location.latitude})`);
    }
}
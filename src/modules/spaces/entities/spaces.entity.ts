import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { SpaceModel } from '../models/space.model';
import * as wkt from "terraformer-wkt-parser";
import { SpaceTypeEntity } from './space.type.entity';

@Entity({name: "space"})
export class SpaceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string
    
    @Column("geometry", { nullable: true })
    @Index({ spatial: true })
    location: object;

    @ManyToOne(type => SpaceTypeEntity)
    @JoinColumn()
    type: SpaceTypeEntity;

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
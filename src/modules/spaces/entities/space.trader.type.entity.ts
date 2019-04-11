import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({name: "spaceTraderType"})
export class SpaceTraderTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string
}
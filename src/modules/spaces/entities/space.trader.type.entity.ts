import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({name: "space_trader_type"})
export class SpaceTraderTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string
}
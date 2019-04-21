import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({name: "space_commodity"})
export class SpaceCommodityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    icon: string
}
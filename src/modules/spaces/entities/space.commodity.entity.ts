import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({name: "spaceCommodity"})
export class SpaceCommodityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string

    @Column()
    icon: string
}
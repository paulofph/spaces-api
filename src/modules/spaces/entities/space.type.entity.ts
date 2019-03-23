import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({name: "spaceType"})
export class SpaceTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string
}
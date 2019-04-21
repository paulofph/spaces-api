import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({name: "space_type"})
export class SpaceTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string
}
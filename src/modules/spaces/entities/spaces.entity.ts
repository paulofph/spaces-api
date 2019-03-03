import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class SpaceEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("geometry", { nullable: true })
    @Index({ spatial: true })
    location: object;
}
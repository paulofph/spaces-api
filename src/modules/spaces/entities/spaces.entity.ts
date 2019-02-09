import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Space {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("point")
    point: string;
}
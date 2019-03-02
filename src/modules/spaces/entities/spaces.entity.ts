import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Space {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("geometry", {
        nullable: true
      })
    @Index({
    spatial: true
    })
    point: object;
}
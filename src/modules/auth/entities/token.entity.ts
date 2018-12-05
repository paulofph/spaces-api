import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  token: string;

  @Column('int')
  ttl: string;
}
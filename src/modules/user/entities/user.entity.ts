import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  facebookKey: string;

  @Column({ length: 500 })
  name: string;

  @ManyToOne(type => Role, role => role.users)
    role: Role;
}
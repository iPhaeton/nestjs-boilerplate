import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../role/role.entity';
import { Address } from '../address/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', {unique: true})
  email: string;

  @Column('text')
  password: string;

  @ManyToOne(type => Role)
  @JoinColumn()
  role: Role;

  @ManyToOne(type => Address)
  @JoinColumn()
  address: Address;
}
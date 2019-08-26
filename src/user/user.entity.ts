import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text')
  salt: string;
}
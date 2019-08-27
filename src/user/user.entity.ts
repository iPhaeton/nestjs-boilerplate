import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../role/role.entity';
import { Address } from '../address/address.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column({ length: 500 })
  name: string;

  @ApiModelProperty()
  @Column('text', {unique: true})
  email: string;

  @ApiModelProperty()
  @Column('text')
  password: string;

  @ApiModelProperty()
  @ManyToOne(type => Role)
  @JoinColumn()
  role: Role;

  @ApiModelProperty()
  @ManyToOne(type => Address)
  @JoinColumn()
  address: Address;
}
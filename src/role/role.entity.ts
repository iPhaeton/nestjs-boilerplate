import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { RoleType } from "./role.types";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: RoleType
}
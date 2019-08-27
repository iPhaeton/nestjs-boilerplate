import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { RoleType } from "./role.types";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity()
export class Role {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column('text', {unique: true})
    type: RoleType
}
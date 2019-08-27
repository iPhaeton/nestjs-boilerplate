import { IsNotEmpty, IsString, IsIn } from "class-validator";
import { RoleType } from "./role.types";
import { ApiModelProperty } from "@nestjs/swagger";

export class RoleDto {
    @ApiModelProperty({enum: RoleType})
    @IsNotEmpty()
    @IsIn(Object.values(RoleType))
    @IsString()
    readonly type: RoleType;
}
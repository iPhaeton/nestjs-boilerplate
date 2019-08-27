import { IsNotEmpty, IsString, IsIn } from "class-validator";
import { RoleType } from "./role.types";

export class RoleDto {
    @IsNotEmpty()
    @IsIn(Object.values(RoleType))
    @IsString()
    readonly type: RoleType;
}
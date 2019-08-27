import { IsNotEmpty, IsString } from "class-validator";
import { RoleType } from "./role.types";

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    readonly type: RoleType;
}
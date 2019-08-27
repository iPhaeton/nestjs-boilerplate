import { IsNotEmpty, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class AddressDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly line: string;
}
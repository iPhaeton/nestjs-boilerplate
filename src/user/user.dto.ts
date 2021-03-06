import { ApiModelProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly email: string;
}

export class UserDtoWithToken extends UserDto {
    @ApiModelProperty()
    readonly token: string;
}
import { IsEmail, IsString, Length, IsNotEmpty, ValidateNested } from 'class-validator';
import { RoleDto } from '../role/role.dto';
import { AddressDto } from '../address/address.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    @Length(8)
    @IsString()
    readonly password: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @ValidateNested()
    readonly role: RoleDto;

    @ApiModelProperty()
    @IsNotEmpty()
    @ValidateNested()
    readonly address: AddressDto;
}

export class LoginDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}

export class JwtPayloadDto {
    readonly id: number;
    readonly email: number;
}
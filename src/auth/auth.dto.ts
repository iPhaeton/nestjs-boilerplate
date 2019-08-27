import { IsEmail, IsString, Length, IsNotEmpty, ValidateNested } from 'class-validator';
import { RoleDto } from '../role/role.dto';
import { AddressDto } from '../address/address.dto';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @Length(8)
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @ValidateNested()
    readonly role: RoleDto;

    @IsNotEmpty()
    @ValidateNested()
    readonly address: AddressDto;
}

export class JwtPayloadDto {
    readonly id: number;
    readonly email: number;
}
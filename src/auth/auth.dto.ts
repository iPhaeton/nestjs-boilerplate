import { IsEmail, IsString, Length, IsNotEmpty, ValidateNested } from 'class-validator';
import { RoleDto } from '../role/role.dto';

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
}

export class JwtPayloadDto {
    readonly id: number;
    readonly email: number;
}
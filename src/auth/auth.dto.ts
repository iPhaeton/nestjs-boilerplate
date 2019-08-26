import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @Length(8)
    @IsString()
    readonly password: string;
}
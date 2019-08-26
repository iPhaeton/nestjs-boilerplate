import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    readonly email: string;

    @Length(8)
    @IsString()
    readonly password: string;
}
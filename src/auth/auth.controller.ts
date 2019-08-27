import { Controller, Post, UseGuards, Request, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto, LoginDto } from "./auth.dto";
import { PasswordProvider } from "./password.provider";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { UserDto, UserDtoWithToken } from "../user/user.dto";
import {AuthService} from './auth.service';
import { ConfigService } from "../config/config.service";
import { ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    @ApiResponse({status: 200, description: 'User with relations', type: UserDto})
    async register(
        @Body()
        credentials: RegisterDto,
    ): Promise<UserDto> {
        const {name, email, password: passwordSrting, role, address} = credentials;
        const salt = this.configService.getSalt();
        const password = await PasswordProvider.encryptPassword(passwordSrting, salt);

        const user = await this.userService.create({
            name,
            email,
            password,
            role,
            address,
        } as User);
    
        return this.userService.getUserDto(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiResponse({status: 200, description: 'User with relations', type: UserDtoWithToken})
    async login(
        @Body() credentials: LoginDto,
        @Request() req,
    ) {
        const {user} = req;
        const token = await this.authService.createToken(user);
        
        return {
            ...user,
            token,
        };
    }
}
import { Controller, Post, UseGuards, Request, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto } from "./auth.dto";
import { PasswordProvider } from "./password.provider";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { UserDto } from "src/user/user.dto";
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(
        @Body()
        credentials: RegisterDto,
    ): Promise<UserDto> {
        const {name, email, password: passwordSrting} = credentials;
        const passwordData = await PasswordProvider.encryptPassword(passwordSrting);

        const user = await this.userService.create({
            name,
            email,
            ...passwordData,
        } as User);
    
        return this.userService.getUserDto(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
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
import { Controller, Post, UseGuards, Request, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto } from "./auth.dto";
import { PasswordProvider } from "./password.provider";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(
        @Body()
        credentials: RegisterDto,
    ) {
        const {name, email, password: passwordSrting} = credentials;
        const passwordData = await PasswordProvider.encryptPassword(passwordSrting);

        const user = await this.userService.create({
            name,
            email,
            ...passwordData,
        } as User);
    
        const {password, salt, ...userData} = user;
    
        return userData;
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Request() req,
    ) {
        return req.user;
    }
}
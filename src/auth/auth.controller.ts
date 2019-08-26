import { Controller, Post, UseGuards, Request, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto } from "./auth.dto";

@Controller('auth')
export class AuthController {
    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(
        @Body()
        credentials: RegisterDto,
    ) {
        console.log(credentials);
        return {};
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Request() req,
    ) {
        return req.user;
    }
}
import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async create(
        @Body()
        user: User,
    ) {
        const createdUser = await this.userService.create(user);
        return createdUser;
    }
}
import { Controller, Post, Body, Request, UseGuards, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getUser(
        @Param('id')
        id: number,
    ) {
        const user = await this.userService.findOne({where: {id}, relations: ["role"]});
        return this.userService.getUserDto(user);
    }
}
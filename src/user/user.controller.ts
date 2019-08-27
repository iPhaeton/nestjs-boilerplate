import { Controller, UseGuards, Get, Param, SetMetadata } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guards/roles.guard";
import { RoleType } from "../role/role.types";
import {Roles} from '../decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    @Roles(RoleType.ADMIN)
    async getUser(
        @Param('id')
        id: number,
    ) {
        const user = await this.userService.findOne({where: {id}, relations: ['role', 'address']});
        return this.userService.getUserDto(user);
    }
}
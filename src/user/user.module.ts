import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Role } from "../role/role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
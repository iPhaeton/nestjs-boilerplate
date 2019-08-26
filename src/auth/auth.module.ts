import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.startegy";
import { AuthController } from "./auth.controller";

@Module({
    imports: [UserModule, PassportModule],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {};
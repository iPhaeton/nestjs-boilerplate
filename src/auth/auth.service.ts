import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PasswordProvider } from "./password.provider";
import { UserDto } from "../user/user.dto";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "../config/config.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userService.findOne({where: {email}});
            
            if (!user) {
                return null;
            } else {
                const salt = this.configService.getSalt();
                const encryptedPassword = await PasswordProvider.encryptPassword(password, salt);
                if (user && user.password === encryptedPassword) {
                    return this.userService.getUserDto(user);
                } else {
                    return null;
                }
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async createToken(user: UserDto) {
        const {id, email} = user;
        const token = await this.jwtService.signAsync({
            id,
            email,
        });
        return token;
    }
}
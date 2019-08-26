import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PasswordProvider } from "./password.provider";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userService.findOne({where: {email}});
            
            if (!user) {
                return null;
            } else {
                const {password: encryptedPassword} = await PasswordProvider.encryptPassword(password, user.salt);
                if (user && user.password === encryptedPassword) {
                    const {password, salt, ...userData} = user;
                    return userData;
                } else {
                    return null;
                }
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
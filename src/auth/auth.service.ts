import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string) {
        console.log('------------')
        const user = await this.userService.findOne({where: {email}});
        if (user && user.password === password) {
            const {password, ...userData} = user;
            return userData;
        } else {
            return null;
        }
    }
}
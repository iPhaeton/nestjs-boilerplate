import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "../config/config.service";
import { JwtPayloadDto } from "./auth.dto";
import { UserService } from "../user/user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getJwtSecret(),
        });
    }

    async validate(payload: JwtPayloadDto) {
        try {
            const {id} = payload
            const user = await this.userService.findOne({where: {id}});
            return this.userService.getUserDto(user);
        } catch (err) {
            console.log(err)
            return null;
        }
    }
}
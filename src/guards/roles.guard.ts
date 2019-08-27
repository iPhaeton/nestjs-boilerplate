import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        try {
            const roles = this.reflector.get('roles', context.getHandler());
            const request = context.switchToHttp().getRequest();
            const {user: {role: {type}}} = request;
            return roles.includes(type);
        } catch (err) {
            console.log(err);
            throw new HttpException(err.message, 500);
        }
    }
}
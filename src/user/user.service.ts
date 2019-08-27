import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, FindOneOptions } from "typeorm";
import { UserDto } from "./user.dto";
import { Role } from "../role/role.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {};

    async create(user: User): Promise<User> {
        const createdUser = await this.userRepository.create(user);
        return await this.userRepository.save(createdUser);
    }

    async findOne(options?: FindOneOptions<User>): Promise<User> {
        return await this.userRepository.findOne(options);
    }

    getUserDto(user: User): UserDto {
        const {password, ...userDto} = user;
        return userDto;
    }
}
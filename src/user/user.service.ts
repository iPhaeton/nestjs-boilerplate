import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, FindOneOptions } from "typeorm";
import { UserDto } from "./user.dto";
import { Role } from "../role/role.entity";
import {getConnection} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {};

    async create(user: User): Promise<User> {
        const {role, ...userData} = user;

        const savedUser = await getConnection().transaction(async transactionalEntityManager => {
            const existingRole = await transactionalEntityManager.findOne<Role>(Role, {where: {...role}});
            const createdUser = await transactionalEntityManager.create(User, {
                ...userData,
                role: existingRole,
            });

            const savedUser = await transactionalEntityManager.save(createdUser);
            return savedUser;
        });
        
        return savedUser;
    }

    async findOne(options?: FindOneOptions<User>): Promise<User> {
        return await this.userRepository.findOne(options);
    }

    getUserDto(user: User): UserDto {
        const {password, ...userDto} = user;
        return userDto;
    }
}
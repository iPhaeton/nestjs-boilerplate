import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, FindOneOptions } from "typeorm";
import { UserDto } from "./user.dto";
import { Role } from "../role/role.entity";
import {getConnection} from "typeorm";
import { Address } from "../address/address.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {};

    async create(user: User): Promise<User> {
        try {
            const {role, address, ...userData} = user;

            const savedUser = await getConnection().transaction(async transactionalEntityManager => {
                const existingRole = await transactionalEntityManager.findOne(Role, {where: {...role}});
    
                let savedAddress = await transactionalEntityManager.findOne(Address, {where: {...address}});
                if (!savedAddress) {
                    const createdAddress = await transactionalEntityManager.create(Address, address);
                    savedAddress = await transactionalEntityManager.save(createdAddress);
                };
    
                const createdUser = await transactionalEntityManager.create(User, {
                    ...userData,
                    role: existingRole,
                    address: savedAddress,
                });
    
                const savedUser = await transactionalEntityManager.save(createdUser);
                return savedUser;
            });
            
            return savedUser;
        } catch(err) {
            console.log(err);
            throw new HttpException(err.message, 500);
        }
    }

    async findOne(options?: FindOneOptions<User>): Promise<User> {
        return await this.userRepository.findOne(options);
    }

    getUserDto(user: User): UserDto {
        const {password, ...userDto} = user;
        return userDto;
    }
}
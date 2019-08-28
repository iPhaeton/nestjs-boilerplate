import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";
import { ConfigModule } from "../config/config.module";
import { AuthController } from "./auth.controller";
import { getCredentials } from "../test/data.helper";
import { RoleType } from "../role/role.types";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";
import { Address } from "../address/address.entity";

describe('Auth', () => {
    let authController: AuthController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                UserModule,
                ConfigModule,
                TypeOrmModule.forRootAsync({
                    useFactory: (configService: ConfigService) => {
                        return ({
                            type: 'postgres',
                            host: configService.getDbHostname(),
                            port: configService.getDbPort(),
                            username: configService.getDbUsername(),
                            password: configService.getDbPassword(),
                            database: configService.getDbName(),
                            entities: [User, Role, Address],
                            synchronize: true,
                        })
                    },
                    inject: [ConfigService],
                }),
                JwtModule.registerAsync({
                    useFactory: (configService: ConfigService) => ({
                        secret: configService.getJwtSecret(),
                        signOptions: { expiresIn: '600s' },
                    }),
                    inject: [ConfigService],
                }),
            ],
            controllers: [AuthController],
            providers: [AuthService]
        }).compile();

        authController = module.get<AuthController>(AuthController);
    });

    describe('register', () => {
        it('should create a user in the database', async () => {
            const credentials = getCredentials(RoleType.ADMIN);
            const user = await authController.register(credentials);
            console.log(user)
        })
    })
})
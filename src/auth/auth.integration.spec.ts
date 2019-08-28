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
import { TestUtils } from "../test/test-utils.helper";
import {PasswordProvider} from '../auth/password.provider';
import {omit} from 'ramda';
jest.mock('../auth/password.provider');

describe('Auth', () => {
    let authController: AuthController;
    let testUtils: TestUtils;

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
            providers: [AuthService, TestUtils],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        testUtils = module.get<TestUtils>(TestUtils);

        await testUtils.givenEmptyDatabase();
        await testUtils.givenRoles();
    });

    // afterAll(async () => await testUtils.clearDatabase());

    describe('register', () => {
        it('should create a user in the database', async () => {
            const encryptedPassword = '111';
            jest.spyOn(PasswordProvider, 'encryptPassword').mockImplementation(async () => encryptedPassword);
            const credentials = getCredentials(RoleType.ADMIN, '123456789');
            const user: any = await authController.register(credentials);

            expect(user.name).toBe(credentials.name);
            expect(user.email).toBe(credentials.email);
            expect(user.password).toBe(undefined);
            expect(user.role.type).toBe(credentials.role.type);
            expect(user.address.line).toBe(credentials.address.line);

            const expectedDatabaseEntity = {
                id: user.id,
                name: credentials.name,
                email: credentials.email,
                password: encryptedPassword,
                roleId: user.role.id,
                addressId: user.address.id,
            }

            const users = await testUtils.findAll('public.user');

            expect(users).toContainEqual(expectedDatabaseEntity);
        })
    })
})
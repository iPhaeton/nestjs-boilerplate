import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {ConfigService} from '../config/config.service';
import {UserService} from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RoleType } from '../role/role.types';
import {PasswordProvider} from '../auth/password.provider';
import { getCredentials } from '../test/data.helper';
jest.mock('../auth/password.provider');
const sinon = require('sinon');

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let configService = sinon.createStubInstance(ConfigService);
    let userService = sinon.createStubInstance(UserService);
    let jwtService = sinon.createStubInstance(JwtService);
    let userRepository = sinon.createStubInstance(Repository);

    beforeEach(() => {
        userService = new UserService(userRepository);
        authService = new AuthService(userService, jwtService, configService);
        authController = new AuthController(userService, authService, configService);
    });

    describe('register', () => {
        it('should return a user data transfer object', async () => {
            const credentials = getCredentials(RoleType.ADMIN, '123456789');

            const result = {
                id:1, 
                name: credentials.name,
                email: credentials.email,
                role: {id: 1, ...credentials.role},
                address: {id: 1, ...credentials.address},
            };
            
            const salt = 'salt';
            const encryptedPassword = '111';
            const createdUser = {...result, password: encryptedPassword};

            jest.spyOn(configService, 'getSalt').mockImplementation(() => salt);
            const encryptPasswordSpy = jest.spyOn(PasswordProvider, 'encryptPassword').mockImplementation(async () => encryptedPassword);
            const createSpy = jest.spyOn(userService, 'create').mockImplementation(async () => createdUser);
            const getUserDtoSpy = jest.spyOn(userService, 'getUserDto').mockImplementation(() => result);

            const user = await authController.register(credentials);
            
            expect(encryptPasswordSpy).toHaveBeenCalledWith(credentials.password, salt);
            expect(createSpy).toHaveBeenCalledWith({...credentials, password: encryptedPassword});
            expect(getUserDtoSpy).toHaveBeenCalledWith(createdUser);
            expect(user).toBe(result);
        });
    });
});
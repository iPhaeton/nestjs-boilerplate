import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../src/auth/auth.controller";
import { TestUtils } from "../src/test/test-utils.helper";
import {AppModule} from '../src/app.module';
import * as request from 'supertest';
import { getCredentials } from "../src/test/data.helper";
import { RoleType } from "../src/role/role.types";

describe('AuthController (e2e)', () => {
    let app;
    let authController: AuthController;
    let testUtils: TestUtils;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, TestUtils],
        }).compile();
      
        app = moduleFixture.createNestApplication();
        await app.init();

        testUtils = moduleFixture.get<TestUtils>(TestUtils);
        await testUtils.givenEmptyDatabase();
        await testUtils.givenRoles();
    })

    it('/auth/register (POST)', () => {
        const expectedResult = {
            id: 1,
            name: 'Ilya',
            email: 'qqq@qqq.com',
            role: { id: 1, type: 'ADMIN' },
            address: { id: 1, line: 'Minsk' },
        }

        return request(app.getHttpServer())
            .post('/auth/register')
            .send(getCredentials(RoleType.ADMIN, '123456789'))
            .expect(201)
            .expect(res => {
                res.body.id = 1;
                res.body.role.id = 1;
                res.body.address.id = 1;
            })
            .expect(expectedResult)
    })
})
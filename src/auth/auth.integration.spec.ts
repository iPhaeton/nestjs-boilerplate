import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";
import { ConfigModule } from "../config/config.module";

describe('Auth', () => {
    let authModule: any;

    beforeEach(async () => {
        authModule = await Test.createTestingModule({
            imports: [
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
                            entities: [__dirname + '/**/*.entity{.ts,.js}'],
                            synchronize: true,
                        })
                    },
                    inject: [ConfigService],
                  }),
            ]
        }).compile();
    });

    describe('register', () => {
        it('should create a user in the database', async () => {
            console.log('!!!!!!!!!!!!!!!!!!!');
        })
    })
})
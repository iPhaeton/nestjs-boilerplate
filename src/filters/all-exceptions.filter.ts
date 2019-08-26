import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, INestApplication } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ConfigService } from "../config/config.service";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private configService: ConfigService

    constructor(app: INestApplication, configService: ConfigService) {
        super(app as any);
        this.configService = configService;
    }

    private handleDevelopmentExcption(exception: unknown, host: ArgumentsHost) {
        if (exception instanceof HttpException) {
            super.catch(exception, host);
        } else {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();

            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception);
        }
    }

    catch(exception: unknown, host: ArgumentsHost) {
        if (this.configService.getEnv() !== 'production') {
            this.handleDevelopmentExcption(exception, host)
        } else {
            super.catch(exception, host);
        }
    }
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(app, configService));

  const options = new DocumentBuilder()
    .setTitle('Auth example')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.getPort();
  await app.listen(port);
}
bootstrap();

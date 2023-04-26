import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const validatorOptions: ValidationPipeOptions = {
    transform: true,
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  };
  app.useGlobalPipes(new ValidationPipe(validatorOptions));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Nexion Solutions')
    .setDescription('Exercise')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', bearerFormat: 'Token' }, 'Bearer')
    .build();
  const options = { useGlobalPrefix: true, explorer: true };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(AppModule.SERVER_PORT, () => {
    console.log(`Server running on PORT ${AppModule.SERVER_PORT}`);
  });
}
bootstrap();

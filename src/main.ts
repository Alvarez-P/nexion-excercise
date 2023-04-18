import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('ADC')
    .setDescription('Nestjs Course')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', bearerFormat: 'Token' }, 'Bearer')
    .build();
  const options = {
    useGlobalPrefix: true,
    explorer: true,
    customCss: `.topbar-wrapper img {content:url(\'https://docs.nestjs.com/assets/logo-small.svg'); width:50px; height:auto;}`,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(AppModule.SERVER_PORT, () => {
    console.log(`Server running on PORT ${AppModule.SERVER_PORT}`);
  });
}
bootstrap();

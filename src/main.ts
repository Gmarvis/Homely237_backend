import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './Environment.config';
import { Sequelize } from 'sequelize-typescript';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  // const sequelize = app.get(Sequelize);
  // await sequelize.sync({force: true}) this function should be used gracefully for it will drop all tables in the database

  const config = new DocumentBuilder()
    .setTitle('Homgig api')
    .setDescription('Homygig server API description')
    .setVersion('1.0')
    .addTag("Documentation")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(`🚀server is up an running on port ${port}🚀`);
}
bootstrap();

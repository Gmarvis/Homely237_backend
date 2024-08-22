import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './Environment.config';

const port =  PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: console,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(`🚀server is up an running on port ${port}🚀`)
}
bootstrap();

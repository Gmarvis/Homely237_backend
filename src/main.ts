import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: console,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
  console.log("🚀server is up an running on port 4000🚀")
}
bootstrap();

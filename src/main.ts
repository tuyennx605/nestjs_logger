import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true, // có thể là process.env.NODE_ENV === 'production' ? false : true
  });
  await app.listen(3000);
}
bootstrap();

/* самый главный файл, основа */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();/* разрешаю все запросы,с локалХоста тоже */
  app.setGlobalPrefix('api');/* добавляю /api к урлу*/
  await app.listen(3000);
}
bootstrap();

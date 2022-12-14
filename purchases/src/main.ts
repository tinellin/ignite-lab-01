import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 3334;

  const app = await NestFactory.create(AppModule);
  app.listen(PORT).then(() => {
    console.log(`[Purchases] HTTP server running on port ${PORT} 🚀`);
  });
}
bootstrap();

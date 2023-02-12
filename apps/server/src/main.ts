import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbConnectionService } from './modules/dbConnection/dbConnection.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dbConnection = app.get(DbConnectionService);
  await dbConnection.connect();

  app.enableCors();
  await app.listen(3001);
}
bootstrap();

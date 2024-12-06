import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main pokemon service');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
  logger.log(`Pokemon service running on port ${envs.port}`);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { envs, SeedService } from './common';

async function bootstrap() {
  const logger = new Logger('Main pokemon service');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.host,
        port: envs.port,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  const seedService = app.get(SeedService);
  await seedService.runSeed();

  await app.listen();

  logger.log(`Pokemon service running on port ${envs.port}`);
}

bootstrap();

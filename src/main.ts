import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

//-----------------------------------------------------------

async function bootstrap() {
  const logger = new Logger('Main');
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const url_nast =
    configService.get<string>('NATS_URL') || 'nats://localhost:4222';

  await appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: ['error', 'warn', 'log', 'debug'],
      transport: Transport.NATS,
      options: {
        servers: [url_nast],
        name: 'USER_MICROSERVICE',
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log('USER MICROSERVICE IS RUNNING');
}

void bootstrap();

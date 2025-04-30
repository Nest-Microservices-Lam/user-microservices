import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

import { AppModule } from './app.module';

//-----------------------------------------------------------

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);

  await app.listen(`${configService.get<string>('SERVER.port')}`, () => {
    Logger.log(
      `USER MICROSERVICE ON PORT ${configService.get<string>('SERVER.port')}`,
    );
  });
}

void bootstrap();

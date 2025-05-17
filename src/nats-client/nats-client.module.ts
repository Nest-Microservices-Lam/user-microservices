import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

//------------------------------------------------------

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [
              configService.get<string>('NATS_URL') || 'nats://localhost:4222',
            ],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [
              configService.get<string>('NATS_URL') || 'nats://localhost:4222',
            ],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
})
export class NatsClientModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

//--------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([User]), NatsClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

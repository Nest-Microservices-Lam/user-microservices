import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs/app.config';

import { UsersModule } from './users/users.module';

//-----------------------------------------------------------

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

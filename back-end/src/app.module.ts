import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthenticationModule,
    UsersModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

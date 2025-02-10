import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), 
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),  
    CronJobsModule, 
  ],
})
export class AppModule {}

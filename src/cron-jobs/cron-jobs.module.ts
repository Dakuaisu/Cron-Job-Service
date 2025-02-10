import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobSchema } from './cron-jobs.schema';
import { HistorySchema } from '../history/history.schema';
import { CronJobsService } from './cron-jobs.service';
import { CronJobsController } from './cron-jobs.controller';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(), 
    MongooseModule.forFeature([{ name: 'CronJob', schema: CronJobSchema }]),
    MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
  ],
  providers: [CronJobsService, SchedulerRegistry], 
  controllers: [CronJobsController],
})
export class CronJobsModule {}

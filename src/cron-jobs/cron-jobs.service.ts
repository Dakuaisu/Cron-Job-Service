import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ICronJob } from './cron-jobs.schema';
import { CreateCronJobDto } from './dto/create-cron-job.dto';
import { UpdateCronJobDto } from './dto/update-cron-job.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import axios from 'axios';

//Cron Job Service
@Injectable()
export class CronJobsService {
  constructor(
    @InjectModel('CronJob') private readonly cronJobModel: Model<ICronJob>,
    @InjectModel('History') private readonly historyModel: Model<any>, // Add History model
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  //Create a new cron job
  async create(createCronJobDto: CreateCronJobDto): Promise<ICronJob> {
    const createdCronJob = new this.cronJobModel(createCronJobDto);
    const savedCronJob = await createdCronJob.save();
    this.scheduleCronJob(savedCronJob);
    return savedCronJob;
  }
  //Update a cron job
  async update(id: string, updateCronJobDto: UpdateCronJobDto): Promise<ICronJob> {
    const updatedCronJob = await this.cronJobModel
      .findByIdAndUpdate(id, updateCronJobDto, { new: true })
      .exec();

    if (!updatedCronJob) {
      throw new Error('Cron job not found');
    }

    this.scheduleCronJob(updatedCronJob);
    return updatedCronJob;
  }
  //Delete a cron job
  async delete(id: string): Promise<void> {
    const cronJob = await this.cronJobModel.findById(id).exec();
    if (cronJob) {
      this.schedulerRegistry.deleteCronJob(cronJob._id.toString());
    }
    await this.cronJobModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<ICronJob[]> {
    return this.cronJobModel.find().exec();
  }
  //Schedule a cron job
  private scheduleCronJob(cronJob: ICronJob) {
    const job = new CronJob(cronJob.schedule, () => {
      this.triggerCronJob(cronJob);
    });

    this.schedulerRegistry.addCronJob(cronJob._id.toString(), job);
    job.start();
  }
  //Trigger a cron job
  private async triggerCronJob(cronJob: ICronJob) {
    try {
      const response = await axios.get(cronJob.link, {
        headers: { 'x-api-key': cronJob.apiKey },
      });
      await this.logHistory(cronJob._id.toString(), response.data, 'success');
    } catch (error) {
      await this.logHistory(cronJob._id.toString(), error.response?.data || error.message, 'failed');
    }
  }
  //Log cron job history
  private async logHistory(cronJobId: string, response: any, status: 'success' | 'failed') {
    const history = new this.historyModel({
      cronJobId,
      response,
      status,
      createdAt: new Date(),
    });
    await history.save();
  }
}
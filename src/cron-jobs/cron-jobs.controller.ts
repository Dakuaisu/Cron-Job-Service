import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { CreateCronJobDto } from './dto/create-cron-job.dto';
import { UpdateCronJobDto } from './dto/update-cron-job.dto';

@Controller('cron-jobs') // Ensure the route prefix is 'cron-jobs'
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @Post()
  async create(@Body() createCronJobDto: CreateCronJobDto) {
    return this.cronJobsService.create(createCronJobDto);
  }

  @Get()
  async findAll() {
    return this.cronJobsService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCronJobDto: UpdateCronJobDto) {
    return this.cronJobsService.update(id, updateCronJobDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cronJobsService.delete(id);
  }
}
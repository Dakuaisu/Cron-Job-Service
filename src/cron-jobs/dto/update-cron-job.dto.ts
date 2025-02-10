// src/cron-jobs/dto/update-cron-job.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCronJobDto } from './create-cron-job.dto';

export class UpdateCronJobDto extends PartialType(CreateCronJobDto) {}
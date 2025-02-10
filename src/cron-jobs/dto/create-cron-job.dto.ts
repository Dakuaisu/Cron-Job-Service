// src/cron-jobs/dto/create-cron-job.dto.ts
import { IsString, IsUrl, IsDateString } from 'class-validator';

export class CreateCronJobDto {
  @IsString()
  name: string;

  @IsUrl()
  link: string;

  @IsString()
  apiKey: string;

  @IsString()
  schedule: string;

  @IsDateString()
  startDate: string;
}

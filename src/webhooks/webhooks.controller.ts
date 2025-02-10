import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  async handleWebhook(@Body() data: any) {
    const cronJobId = data.cronJobId; 
    return this.webhooksService.create(data, cronJobId);
  }

  @Get()
  async findAll() {
    return this.webhooksService.findAll();
  }
}
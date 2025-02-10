import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWebhook } from './webhooks.schema'; // Ensure IWebhook is imported

@Injectable()
export class WebhooksService {
  constructor(@InjectModel('Webhook') private readonly webhookModel: Model<IWebhook>) {}

  async create(data: any, cronJobId: string): Promise<IWebhook> {
    const webhook = new this.webhookModel({ data, cronJobId });
    return webhook.save();
  }

  async findAll(): Promise<IWebhook[]> {
    return this.webhookModel.find().exec();
  }
}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookSchema, IWebhook } from './webhooks.schema';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Webhook', schema: WebhookSchema }]),
  ],
  providers: [WebhooksService],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
import { Schema, Document } from 'mongoose';

export const WebhookSchema = new Schema({
  data: { type: Object, required: true },
  cronJobId: { type: Schema.Types.ObjectId, ref: 'CronJob' },
  createdAt: { type: Date, default: Date.now },
});

export interface IWebhook extends Document {
  data: any;
  cronJobId: string;
  createdAt: Date;
}
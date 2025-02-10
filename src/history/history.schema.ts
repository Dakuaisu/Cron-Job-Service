import { Schema, Document, Types } from 'mongoose';

export const HistorySchema = new Schema({
  cronJobId: { type: Types.ObjectId, ref: 'CronJob', required: true },
  response: { type: Object },
  status: { type: String, enum: ['success', 'failed'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface IHistory extends Document {
  cronJobId: Types.ObjectId;
  response: any;
  status: string;
  createdAt: Date;
}
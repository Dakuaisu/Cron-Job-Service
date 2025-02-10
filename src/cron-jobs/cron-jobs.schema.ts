import { Schema, Document, Types } from 'mongoose';

//Cron Job Schema
export const CronJobSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  apiKey: { type: String, required: true },
  schedule: { type: String, required: true },
  startDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export interface ICronJob extends Document {
  _id: Types.ObjectId; // Explicitly define _id
  name: string;
  link: string;
  apiKey: string;
  schedule: string;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
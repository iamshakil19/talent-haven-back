import mongoose from 'mongoose';
import { IJob } from './job.interface';
import { Schema } from 'mongoose';

const JobSchema = new mongoose.Schema<IJob>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    technology: {
      type: [String],
      required: true,
    },
    expDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Job = mongoose.model<IJob>('Job', JobSchema);

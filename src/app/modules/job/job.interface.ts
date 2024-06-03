import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IJob {
  employer: Types.ObjectId | IUser;
  title: string;
  description: string;
  type: string;
  category: string;
  location: string;
  slug: string;
  experience: number;
  salary: number;
  isUrgent: boolean;
  technology: string[];
  expDate: Date;
  views: number;
  isDeleted: boolean;
  status: 'active' | 'block' | 'hired';
}

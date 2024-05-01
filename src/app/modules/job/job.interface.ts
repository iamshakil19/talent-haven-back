import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IJob {
  employer: Types.ObjectId | IUser;
  title: string;
  description: string;
  type: string;
  category: string;
  location: string;
  experience: string;
  salary: string;
  isUrgent: boolean;
  technology: string[];
}

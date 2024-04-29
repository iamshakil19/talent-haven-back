import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type TJobType = 'remote' | 'onsite' | 'hybrid';

export interface IJob {
    company: Types.ObjectId | IUser;
    title: string;
    description: string;
    jobType: TJobType;
    
}
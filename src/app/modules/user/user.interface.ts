/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IProfile } from '../profile/profile.interface';

export type IUserRole = 'system-admin' | 'candidate' | 'employer'
export type TUserStatus = 'active' | 'inactive' | 'suspend';

export interface IUser {
  name: string;
  email: string;
  role: IUserRole,
  phone?: string;
  password: string;
  status: TUserStatus;
  profile?: Types.ObjectId | IProfile;
  isDeleted: boolean;
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<IUser>;


  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
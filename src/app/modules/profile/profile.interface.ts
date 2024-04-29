import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface ISocial {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    website: string;
}

export interface IProfile {
    user?: Types.ObjectId | IUser;
    profileImage?: string;
    address: string;
    dateOfBirth: string;
    companySize: string;
    social: ISocial;
}
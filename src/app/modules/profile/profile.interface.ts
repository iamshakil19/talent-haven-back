import { Types } from "mongoose";
import { IUser } from "../user/user.interface";


export interface IProfile {
    user?: Types.ObjectId | IUser;
    image?: string;
    permanentAddress: string;
    presentAddress: string;
    dateOfBirth: string;
}
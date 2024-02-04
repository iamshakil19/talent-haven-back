import mongoose, { Schema } from "mongoose";
import { IProfile } from "./profile.interface";


const ProfileSchema = new mongoose.Schema<IProfile>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        image: {
            type: String,
        },
        permanentAddress: {
            type: String,
        },
        presentAddress: {
            type: String,
        },
        dateOfBirth: {
            type: String,
        },
    }
)

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema)
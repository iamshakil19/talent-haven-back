import mongoose, { Schema } from "mongoose";
import { IProfile } from "./profile.interface";


const ProfileSchema = new mongoose.Schema<IProfile>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        profileImage: {
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
        companySize: {
            type: String,
        },
        social: {
            facebook: {
                type: String,
            },
            twitter: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            instagram: {
                type: String,
            },
            website: {
                type: String,
            }
        }

    }
)

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema)
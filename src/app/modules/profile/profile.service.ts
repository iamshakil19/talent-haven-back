import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { validateUser } from "../../utils/validateUser"
import { User } from "../user/user.model"
import { IProfile } from "./profile.interface"
import { Profile } from "./profile.model"
import mongoose from "mongoose"


const updateProfile = async (payload: Partial<IProfile>) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction();

        const user = await User.findById({ _id: payload.user })
        validateUser(user)

        let result = null

        const userProfile = await Profile.findOne({ _id: user?.profile })

        if (!userProfile) {
            result = await Profile.create(payload)
            if (result && user) {
                await User.findOneAndUpdate({ _id: user._id }, { profile: result._id }, { new: true })
            }
        } else {
            result = await Profile.findOneAndUpdate({ _id: userProfile }, payload, {
                new: true,
            })
        }

        await session.commitTransaction();
        await session.endSession();
        return result
        
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        if (error instanceof AppError) {
            throw error;
        } else {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update profile');
        }
    }


}


export const ProfileService = {
    updateProfile
}
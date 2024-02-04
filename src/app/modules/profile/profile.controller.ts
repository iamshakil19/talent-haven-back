import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { IProfile } from "./profile.interface";
import httpStatus from "http-status";
import { ProfileService } from "./profile.service";



const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await ProfileService.updateProfile(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile Updated Successfully!',
        data: result,
    });
})


export const ProfileController = {
    updateProfile
}
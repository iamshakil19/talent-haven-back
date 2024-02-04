import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const result = await UserService.createUser(req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
);

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUser(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users are retrieved successfully',
        data: result,
    });
})

export const UserController = {
    createUser,
    getAllUser
};
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { IUser } from "../modules/user/user.interface";

export const validateUser = (user: Partial<IUser | null>) => {

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    if (user.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user was deleted!');
    }

    const userStatus = user.status;
    if (userStatus === 'suspend') {
        throw new AppError(httpStatus.FORBIDDEN, 'You are suspended!');
    } else if (userStatus === 'inactive') {
        throw new AppError(httpStatus.FORBIDDEN, 'You are blocked');
    }

    return user;
};
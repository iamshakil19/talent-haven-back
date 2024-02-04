import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { jwtHelpers } from '../helpers/jwtHelpers';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/user/user.model';
import { validateUser } from '../utils/validateUser';

const auth =
  (...requiredRoles: string[]) => {

    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // checking if the token is missing
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      let decoded = null;

      decoded = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      const { role, email, iat } = decoded;

      // checking if the user is exist
      const user = await User.isUserExist(email);

      validateUser(user)

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized  hi!',
        );
      }

      req.user = decoded as JwtPayload & { role: string };
      next();
    });
  }

export default auth;

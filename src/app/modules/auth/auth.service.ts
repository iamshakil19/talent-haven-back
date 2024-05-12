import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import { validateUser } from '../../utils/validateUser';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email: userEmail, password } = payload;

  const user = await User.isUserExist(userEmail);

  validateUser(user);

  // match password
  if (
    user.password &&
    !(await User.isPasswordMatched(password, user.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token & refresh token
  const { email, role, _id } = user;
  const accessToken = jwtHelpers.createToken(
    { email, role, id: _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { email, role, id: _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { email } = verifiedToken;

  // checking deleted user's refresh token
  const user = await User.isUserExist(email);

  validateUser(user);

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { email: user.email, role: user.role, id: user._id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  requestedUser: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const user = await User.findOne({ email: requestedUser?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  validateUser(user);

  // checking old password
  if (
    user.password &&
    !(await User.isPasswordMatched(oldPassword, user.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  user.password = newPassword;

  // updating using save()
  user.save();
};

const forgotPass = async (payload: { email: string }) => {
  const user = await User.findOne(
    { email: payload.email },
    { email: 1, role: 1 },
  );

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  validateUser(user);

  const passResetToken = await jwtHelpers.createResetToken(
    { _id: user._id },
    config.jwt.secret as string,
    '5m',
  );

  const resetLink: string =
    config.resetLink + `email=${user?.email}&token=${passResetToken}`;

  // await sendEmail(user.email, `
  //     <div>
  //       <p>Hi, ${user.name}</p>
  //       <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
  //       <p>Thank you</p>
  //     </div>
  // `);

  return {
    message: 'Check your email!',
  };
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const { email, newPassword } = payload;
  const user = await User.findOne({ email }, { email: 1 });

  validateUser(user);

  const isVerified = await jwtHelpers.verifyToken(
    token,
    config.jwt.secret as string,
  );

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.updateOne({ email }, { password });
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPass,
  resetPassword,
};

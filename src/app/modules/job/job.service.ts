import { JwtPayload } from 'jsonwebtoken';
import { IJob } from './job.interface';
import { Job } from './job.model';
import { User } from '../user/user.model';
import { validateUser } from '../../utils/validateUser';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createJob = async (
  requestedUser: JwtPayload | null,
  payload: Partial<IJob>,
): Promise<IJob | null> => {
    
  const user = await User.findOne({ email: requestedUser?.email });
  validateUser(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const finalData = { ...payload, employer: user._id };
  const result = await Job.create(finalData);
  return result;
};

export const JobService = {
  createJob,
};

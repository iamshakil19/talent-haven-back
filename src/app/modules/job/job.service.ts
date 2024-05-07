import { JwtPayload } from 'jsonwebtoken';
import { IJob } from './job.interface';
import { Job } from './job.model';
import { User } from '../user/user.model';
import { validateUser } from '../../utils/validateUser';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { JobSearchableFields } from './job.constant';



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

const getAllJob = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Job.find().populate('employer'), query)
    .search(JobSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

export const JobService = {
  createJob,
  getAllJob,
};

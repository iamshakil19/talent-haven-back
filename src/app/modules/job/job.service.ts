import { JwtPayload } from 'jsonwebtoken';
import { IJob } from './job.interface';
import { Job } from './job.model';
import { User } from '../user/user.model';
import { validateUser } from '../../utils/validateUser';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { JobSearchableFields } from './job.constant';
const ObjectId = require('mongoose').Types.ObjectId;

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
  const filter = { isDeleted: false };
  const jobQuery = new QueryBuilder(
    Job.find(filter).populate({
      path: 'employer',
      populate: {
        path: 'profile',
      },
    }),
    query,
  )
    .search(JobSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await jobQuery.modelQuery;
  const meta = await jobQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

const getMyAllJob = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  const filter = { isDeleted: false, employer: new ObjectId(user.id) };

  const jobQuery = new QueryBuilder(
    Job.find(filter).populate({
      path: 'employer',
      populate: {
        path: 'profile',
      },
    }),
    query,
  )
    .search(JobSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await jobQuery.modelQuery;
  const meta = await jobQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

const getSingleJob = async (slug: string) => {
  const result = await Job.findOne({ slug }).populate({
    path: 'employer',
    populate: {
      path: 'profile',
    },
  });
  return result;
};

const deleteJob = async (id: string) => {
  console.log(id);

  const result = await Job.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const JobService = {
  createJob,
  getAllJob,
  deleteJob,
  getMyAllJob,
  getSingleJob,
};

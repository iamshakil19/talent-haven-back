import { JwtPayload } from 'jsonwebtoken';
import { IJob } from './job.interface';
import { Job } from './job.model';
import { User } from '../user/user.model';
import { validateUser } from '../../utils/validateUser';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { JobSearchableFields } from './job.constant';
import mongoose from 'mongoose';
import { Request } from 'express';

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
  const filter = {
    isDeleted: false,
    employer: new mongoose.Types.ObjectId(user.id),
  };

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

const getAnalytics = async (req: Request) => {
  const { email, id, role } = req?.user;

  const analytics = await Job.aggregate([
    {
      $match: {
        isDeleted: false,
        employer: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $facet: {
        totalJob: [{ $count: 'count' }],
        activeJob: [{ $match: { status: 'active' } }, { $count: 'count' }],
        blockJob: [{ $match: { status: 'block' } }, { $count: 'count' }],
        hiredJob: [{ $match: { status: 'hired' } }, { $count: 'count' }],
        totalShare: [{ $group: { _id: null, total: { $sum: '$share' } } }],
        jobsByMonth: [
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
                date: {
                  $dateToString: { format: '%Y-%m-01', date: '$createdAt' },
                },
              },
              totalJobs: { $count: {} },
            },
          },
          {
            $project: {
              _id: 0,
              date: '$_id.date',
              totalJobs: '$totalJobs',
            },
          },
          { $sort: { date: 1 } }, // Sort by date
        ],
      },
    },
    {
      $project: {
        totalJob: { $arrayElemAt: ['$totalJob.count', 0] },
        activeJob: { $arrayElemAt: ['$activeJob.count', 0] },
        blockJob: { $arrayElemAt: ['$blockJob.count', 0] },
        hiredJob: { $arrayElemAt: ['$hiredJob.count', 0] },
        jobsByMonth: '$jobsByMonth',
      },
    },
  ]);

  const dates = analytics[0].jobsByMonth.map((entry: any) => entry.date);
  const totalJobs = analytics[0].jobsByMonth.map(
    (entry: any) => entry.totalJobs,
  );

  const result = {
    totalJob: analytics[0].totalJob || 0,
    activeJob: analytics[0].activeJob || 0,
    blockJob: analytics[0].blockJob || 0,
    hiredJob: analytics[0].hiredJob || 0,
    jobsByMonth: {
      dates: dates,
      totalJobs: totalJobs,
    },
  };

  return {
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
  getAnalytics,
};

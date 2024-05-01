import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { JobService } from './job.service';
import httpStatus from 'http-status';
import { IJob } from './job.interface';

const createJob = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await JobService.createJob(req?.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const JobController = {
  createJob,
};

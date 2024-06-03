import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { JobService } from './job.service';
import httpStatus from 'http-status';
import { IJob } from './job.interface';

const createJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.createJob(req?.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const getAllJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.getAllJob(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs are retrieved successfully',
    data: result,
  });
});

const getMyAllJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.getMyAllJob(req.query, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs are retrieved successfully',
    data: result,
  });
});

const getAnalytics = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.getAnalytics(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job analytics are retrieved successfully',
    data: result,
  });
});

const getSingleJob = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await JobService.getSingleJob(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job retrieved successfully !',
    data: result,
  });
});

const deleteJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobService.deleteJob(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted',
    data: result,
  });
});

export const JobController = {
  createJob,
  getAllJob,
  deleteJob,
  getMyAllJob,
  getSingleJob,
  getAnalytics,
};

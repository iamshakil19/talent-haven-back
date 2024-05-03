import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobValidation } from './job.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { JobController } from './job.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(JobValidation.JobCreateZodSchema),
  auth(ENUM_USER_ROLE.EMPLOYER),
  JobController.createJob,
);

router.get(
  '/all-jobs',
  JobController.getAllJob
)

export const JobRoutes = router;

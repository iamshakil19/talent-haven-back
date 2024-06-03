import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobValidation } from './job.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../enums/user';
import { JobController } from './job.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(JobValidation.JobCreateZodSchema),
  auth(USER_ROLE.EMPLOYER),
  JobController.createJob,
);

router.get('/all-jobs', JobController.getAllJob);
router.get('/all-my-jobs', auth(USER_ROLE.EMPLOYER), JobController.getMyAllJob);

router.get(
  '/analytics',
  auth(USER_ROLE.SYSTEM_ADMIN, USER_ROLE.EMPLOYER, USER_ROLE.CANDIDATE),
  JobController.getAnalytics,
);

router.get('/:slug', JobController.getSingleJob);
router.delete(
  '/:id',
  auth(USER_ROLE.EMPLOYER, USER_ROLE.SYSTEM_ADMIN),
  JobController.deleteJob,
);

export const JobRoutes = router;

import express from 'express';
import { ProfileController } from './profile.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileValidation } from './profile.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../enums/user';

const router = express.Router();

router.patch(
  '/update',
  auth(USER_ROLE.CANDIDATE, USER_ROLE.SYSTEM_ADMIN, USER_ROLE.EMPLOYER),
  validateRequest(ProfileValidation.updateProfileZodSchema),
  ProfileController.updateProfile,
);

export const ProfileRoutes = router;

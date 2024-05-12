import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../enums/user';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.registerZodSchema),
  UserController.createUser,
);

router.get(
  '/all-users',
  auth(USER_ROLE.SYSTEM_ADMIN),
  UserController.getAllUser,
);

export const UserRoutes = router;

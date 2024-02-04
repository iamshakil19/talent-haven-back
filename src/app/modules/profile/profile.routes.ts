

import express from 'express';
import { ProfileController } from './profile.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileValidation } from './profile.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';


const router = express.Router();

router.patch(
    '/update',
    auth(ENUM_USER_ROLE.CANDIDATE, ENUM_USER_ROLE.SYSTEM_ADMIN, ENUM_USER_ROLE.EMPLOYER),
    validateRequest(ProfileValidation.updateProfileZodSchema),
    ProfileController.updateProfile
);


export const ProfileRoutes = router;
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { JobRoutes } from '../modules/job/job.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/job',
    route: JobRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

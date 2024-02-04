import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/profile',
        route: ProfileRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    }

]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
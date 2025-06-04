import { Router } from 'express';
import authRouter from './endpoints/auth/authController';

const routes = Router();

routes.use('/auth', authRouter);

export default routes;
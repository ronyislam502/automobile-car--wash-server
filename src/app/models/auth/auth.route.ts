import express from 'express';
import { UserControllers } from '../user/user.controller';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signUp',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.signUpUser,
);

router.post('/logIn', AuthControllers.loginUser);

router.post('/refresh-token', AuthControllers.refreshToken);

export const AuthRoutes = router;

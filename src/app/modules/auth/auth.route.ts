import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { authValidation } from './auth.vallidation';
import { authController } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();


router.post(
  '/login',
  ValidateRequest(authValidation.loginSchema),
  authController.loginUser
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  ValidateRequest(authValidation.changePasswordSchema),
  authController.ChangePassword
);

export const authRoutes = router;

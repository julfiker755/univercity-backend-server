import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import ValidateRequest from '../../middleware/validateRequest';

const router = express.Router();



router.post(
  '/create-student',
  ValidateRequest(studentValidations.studentSchema),
  userController.createUser
);

export const userRoutes = router;

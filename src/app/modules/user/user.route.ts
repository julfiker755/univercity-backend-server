import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import ValidateRequest from '../../middleware/validateRequest';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();



router.post(
  '/create-student',
  ValidateRequest(studentValidations.studentSchema),
  userController.createStudent
);
router.post(
  '/create-admin',
  ValidateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin
);
router.post(
  '/create-faculty',
  // ValidateRequest(facultyValidation.facultySchema),
  userController.createFaculty
);

export const userRoutes = router;

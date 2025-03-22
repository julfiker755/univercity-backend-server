import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import ValidateRequest from '../../middleware/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();



router.post(
  '/create-student',
  auth(USER_ROLE.student),
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

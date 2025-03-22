import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import ValidateRequest from '../../middleware/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { upload } from '../../ulits/sendImageToCloudinary';

const router = express.Router();



router.post(
  '/create-student',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
   req.body=JSON.parse(req.body.data)
   next()
  },
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

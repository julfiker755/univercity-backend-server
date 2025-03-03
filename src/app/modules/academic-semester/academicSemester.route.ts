import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();


router.post(
  '/create',
  ValidateRequest(academicSemesterValidation.academicSemesterSchema),
  academicSemesterController.createAcademicSemester,
);

export const academicSemesterRoutes = router;

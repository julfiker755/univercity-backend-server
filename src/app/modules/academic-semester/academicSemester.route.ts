import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();


router.get("/",academicSemesterController.getAllAcademicSemester)
router.post(
  '/create',
  ValidateRequest(academicSemesterValidation.academicSemesterSchema),
  academicSemesterController.createAcademicSemester,
);
router.get("/:semesterId",academicSemesterController.getOneAcademicSemester)
router.patch("/:semesterId",academicSemesterController.updateAcademicSemester)

export const academicSemesterRoutes = router;

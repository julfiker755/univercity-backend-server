import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';


const router = express.Router();


router.get("/",facultyController.getAllFacultyIntoDB)
router.post(
  '/create',
  ValidateRequest(facultyValidation.facultySchema),
  facultyController.createFacultyIntoDB,
);
router.get("/:facultyId",facultyController.getSingleFacultyIntoDB)
router.patch("/:facultyId",facultyController.updateFacultyIntoDB)

export const academicFacultyRoutes = router;

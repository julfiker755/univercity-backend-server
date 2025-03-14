import express from 'express';
import { courseController } from './course.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  ValidateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteCourse);

export const courseRoutes = router;

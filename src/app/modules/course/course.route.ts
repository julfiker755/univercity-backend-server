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
router.patch(
  '/update-course/:id',
  ValidateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateSingleCourse,
);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteCourse);
router.put("/:courseId/assign-faculties",courseController.assignFacultiesCourse)
router.delete("/:courseId/remove-faculties",courseController.removeFacultiesCourse)

export const courseRoutes = router;

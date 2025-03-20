import express from 'express';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import ValidateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.get(
  '/',
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/my-offered-courses',
  OfferedCourseControllers.getMyOfferedCourses,
);

router.get(
  '/:id',
  OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  ValidateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  ValidateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;

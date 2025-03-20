import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';



const router = express.Router();

router.post(
  '/create-semester-registration',
  ValidateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  ValidateRequest(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get(
  '/',SemesterRegistrationController.getAllSemesterRegistrations,
);

export const semesterRegistrationRoutes = router;
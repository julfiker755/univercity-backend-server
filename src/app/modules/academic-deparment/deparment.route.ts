import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { deparmentController } from './deparment.controller';
import { deparmentValidation } from './deparment.validation';

const router = express.Router();

router.get('/', deparmentController.getAllDeparmentIntoDB);
router.post(
  '/create',
  ValidateRequest(deparmentValidation.deparmentSchema),
  deparmentController.createDeparmentIntoDB,
);
router.get('/:depermentId', deparmentController.getSingleDeparmentIntoDB);
router.patch(
  '/:depermentId',
  ValidateRequest(deparmentValidation.deparmentupdateSchema),
  deparmentController.updateDeparmentIntoDB,
);

export const deparmentRoutes = router;

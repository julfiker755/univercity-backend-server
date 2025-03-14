import express from 'express';
import { adminController } from './admin.controller';


const router = express.Router();

router.get('/',adminController.getAllAdmins);

// router.get('/:id', AdminControllers.getSingleAdmin);

// router.patch(
//   '/:id',
//   validateRequest(updateAdminValidationSchema),
//   AdminControllers.updateAdmin,
// );

// router.delete('/:adminId', AdminControllers.deleteAdmin);

export const adminRoutes = router;

import express from 'express';
import { userController } from './user.controller';


const router = express.Router();

// router.get('/', StudentController.getAllStudent);
router.post('/create-user',userController.createUser);

export const userRoutes = router;

import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.post('/create-student', StudentController.createStudent);

export const StudentRoutes = router;

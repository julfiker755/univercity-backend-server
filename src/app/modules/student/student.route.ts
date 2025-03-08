import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();




router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.singleStudentIntoBD);
router.delete('/:studentId', StudentController.deleteStudentIntoBD);
router.patch('/:studentId', StudentController.updateStudentIntoBD);


export const StudentRoutes = router;

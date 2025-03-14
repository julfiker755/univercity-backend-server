import express from 'express';
import { facultyController } from './faculty.controller';


const router = express.Router();

router.get('/',facultyController.getAllFaculties);
// router.get('/', FacultyControllers.getAllFaculties);

export const facultyRoutes = router;

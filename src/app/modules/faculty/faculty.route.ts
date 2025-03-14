import express from 'express';
import { facultyController } from './faculty.controller';


const router = express.Router();

router.get('/',facultyController.getAllFaculties);
router.get('/:id', facultyController.getSingleFaculty);

export const facultyRoutes = router;

import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/academic-semester/academicSemester.route';

const router = Router();

const moduleRoues = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  }
];

moduleRoues.forEach((route) => router.use(route.path, route.route));

export default router;

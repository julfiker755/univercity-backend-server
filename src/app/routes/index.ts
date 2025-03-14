import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/academic-semester/academicSemester.route';
import { academicFacultyRoutes} from '../modules/academic-faculty/faculty.route';
import { deparmentRoutes } from '../modules/academic-deparment/deparment.route';
import { adminRoutes } from '../modules/admin/admin.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';

const router = Router();

const moduleRoues = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },{
    path: '/admin',
    route: adminRoutes,
  },{
    path:"/faculty",
    route:facultyRoutes
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },{
    path:'/academic-faculty',
    route:academicFacultyRoutes
  },{
    path:'/academic-deparment',
    route:deparmentRoutes
  }
];

moduleRoues.forEach((route) => router.use(route.path, route.route));

export default router;

import config from '../../config';
import { academicSemesterModel } from '../academic-semester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';

const createUserBD = async (password: any, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // find  academic semester info
  const admissionSemesterInfo = await academicSemesterModel.findById(
    payload?.admissionSemester,
  );
  userData.id =await generateStudentId(admissionSemesterInfo as any);
  userData.password = password || config.default_password;
  userData.role = 'student';

  const result = await userModel.create(userData);

  if (Object.keys(result).length) {
    payload.id = result.id;
    payload.user = result._id;

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }

  return result;
};

export const userService = {
  createUserBD,
};

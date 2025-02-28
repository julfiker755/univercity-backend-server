import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';

const createUserBD = async (password:any, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || config.default_password;
  userData.role = 'student';
  userData.id = '202599';

  const result = await userModel.create(userData);

  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }

  return result;
};

export const userService = {
  createUserBD,
};

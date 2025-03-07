import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academic-semester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { generateStudentId } from './user.utils';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import httpStatus from 'http-status';
import ApiError from '../../errors/apiError';

const createUserBD = async (password: any, payload: TStudent) => {
  let userData: Partial<TUser> = {};

  // find  academic semester info
  const admissionSemesterInfo = await academicSemesterModel.findById(
    payload?.admissionSemester,
  );
  userData.id = await generateStudentId(admissionSemesterInfo as any);
  userData.password = password || config.default_password;
  userData.role = 'student';

  const sesstion = await mongoose.startSession();
  try {
    sesstion.startTransaction();
    // transaction-1:create-user
    const newUser = await userModel.create([userData], { sesstion });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // transaction-2:create-student
    const newStudent = await StudentModel.create([payload], { sesstion });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await sesstion.commitTransaction();
    sesstion.endSession();
    return newStudent[0]
  } catch (err: any) {
    await sesstion.abortTransaction();
    sesstion.endSession();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message || 'Transaction failed');
  }
};

export const userService = {
  createUserBD,
};

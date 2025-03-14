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

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Transaction-1: Create User
    const newUser = await userModel.create([userData], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Transaction-2: Create Student
    const newStudent = await StudentModel.create([payload], { session }); 
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction(); 
    session.endSession(); 
    return newStudent[0];
  } catch (err: any) {
    await session.abortTransaction(); 
    session.endSession();
    throw new Error(err.message || 'Transaction failed');
  }
};

export const userService = {
  createUserBD,
};

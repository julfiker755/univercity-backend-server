import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academic-semester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { generateAdminId, generateStudentId } from './user.utils';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import httpStatus from 'http-status';
import ApiError from '../../errors/apiError';
import { TAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';

const createStudentBD = async (password: any, payload: TStudent) => {
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



// createAdminIntoDB
const createAdminIntoDB = async (password: string, payload:TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); 
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; 
    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
   session.endSession();

    return newAdmin[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userService = {
  createStudentBD,
  createAdminIntoDB
};

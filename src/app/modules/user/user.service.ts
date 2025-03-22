import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academic-semester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import httpStatus from 'http-status';
import ApiError from '../../errors/apiError';
import { TAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';
import { FacultyModel } from '../faculty/faculty.model';
import { TFaculty } from '../faculty/faculty.interface';
import { deparmentModel } from '../academic-deparment/deparment.model';
import { sendImageToCloudinary } from '../../ulits/sendImageToCloudinary';


// createStudentBD 
const createStudentBD = async (file:any,password: any, payload: TStudent) => {
  let userData: Partial<TUser> = {};
  const admissionSemesterInfo = await academicSemesterModel.findById(
    payload?.admissionSemester,
  );
  userData.id = await generateStudentId(admissionSemesterInfo as any);
  userData.password = password || config.default_password;
  userData.role = 'student';
  const imageName=`${userData.id}${payload.name.firstName}`
  const path=file.path
  const {secure_url}=await sendImageToCloudinary(imageName,path) as any
  console.log(secure_url)

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //  send image to cloudinary
  
    // Transaction-1: Create User
    const newUser = await userModel.create([userData], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg=secure_url

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


// createFacultyIntoDB
const createFacultyIntoDB = async (password: string, payload:TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';
  const academicDepartment = await deparmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new ApiError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session });
    //create a faculty
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)
    const newFaculty = await FacultyModel.create([payload], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userService = {
  createStudentBD,
  createAdminIntoDB,
  createFacultyIntoDB
};

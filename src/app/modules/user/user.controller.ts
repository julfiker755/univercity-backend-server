import { Request, Response } from 'express';
import { userService } from './user.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';


const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  const result = await userService.createStudentBD(req.file,password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});


const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin:adminData } = req.body;
  const result = await userService.createAdminIntoDB(password,adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});


const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty:facultyData } = req.body;
  const result = await userService.createFacultyIntoDB(password,facultyData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});


export const userController = {
  createStudent,
  createAdmin,
  createFaculty 
};

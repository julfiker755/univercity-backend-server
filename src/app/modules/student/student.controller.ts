import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';


const getAllStudent=catchAsync( async (req:Request, res:Response) => {
  const result = await StudentService.getAllStudentFromBD();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Info succesfully',
    data: result,
  });
})

export const StudentController = {
  getAllStudent,
};

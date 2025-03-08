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

const deleteStudentIntoBD=catchAsync( async (req:Request, res:Response) => {
  const {studentId}=req.params
  const result = await StudentService.deleteStudentIntoBD(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student delete succesfully',
    data: result,
  });
})

const singleStudentIntoBD=catchAsync( async (req:Request, res:Response) => {
  const {studentId}=req.params
  const result = await StudentService.singleStudentIntoBD(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student single Info succesfully',
    data: result,
  });
})

const updateStudentIntoBD=catchAsync( async (req:Request, res:Response) => {
  const {studentId}=req.params
  const result = await StudentService.updateStudentIntoBD(studentId,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student update succesfully',
    data: result,
  });
})

export const StudentController = {
  getAllStudent,
  deleteStudentIntoBD,
  singleStudentIntoBD,
  updateStudentIntoBD
};

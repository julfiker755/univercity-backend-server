import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.createAcademicSemester(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester store succesfull',
    data: result,
  });
});


export const academicSemesterController = {
    createAcademicSemester,
};

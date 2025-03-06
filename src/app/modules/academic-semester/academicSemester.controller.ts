import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicSemesterService } from './academicSemester.service';

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.getAllAcademicSemester();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester Info succesfull',
      data: result,
    });
  },
);

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.createAcademicSemester(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester store succesfull',
      data: result,
    });
  },
);

const getOneAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const {semesterId}=req.params
    const result = await academicSemesterService.getOneAcademicSemester(semesterId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester  Info succesfull',
      data: result,
    });
  },
);
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const {semesterId}=req.params
    const payload=req.body
    const result = await academicSemesterService.updateAcademicSemester(semesterId,payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester update succesfull',
      data: result,
    });
  },
);

export const academicSemesterController = {
  getAllAcademicSemester,
  createAcademicSemester,
  getOneAcademicSemester,
  updateAcademicSemester
};

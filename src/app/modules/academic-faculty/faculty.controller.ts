import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { facultyService } from './faculty.service';
import httpStatus from 'http-status';


const getAllFacultyIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await facultyService.getAllFacultyIntoDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Info succesfull',
      data: result,
    });
  },
);

const createFacultyIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await facultyService.createFacultyIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Store succesfull',
      data: result,
    });
  },
);

const getSingleFacultyIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const {facultyId}=req.params
    const result = await facultyService.getSingleFacultyIntoDB(facultyId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty  Info succesfull',
      data: result,
    });
  },
);

const updateFacultyIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const {facultyId}=req.params
    const payload=req.body
    const result = await facultyService.updateFacultyIntoDB(facultyId,payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty update succesfull',
      data: result,
    });
  },
);

export const facultyController = {
    getAllFacultyIntoDB,
    createFacultyIntoDB,
    getSingleFacultyIntoDB,
    updateFacultyIntoDB
};

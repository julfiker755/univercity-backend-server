import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import {deparmentService} from './deparment.service';
import httpStatus from 'http-status';


const getAllDeparmentIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await deparmentService.getAllDeparmentIntoDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deparment Info succesfull',
      data: result,
    });
  },
);

const createDeparmentIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await deparmentService.createDeparmentIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deparment Store succesfull',
      data: result,
    });
  },
);

const getSingleDeparmentIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const {depermentId}=req.params
    const result = await deparmentService.getSingleDeparmentIntoDB(depermentId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deparment  Info succesfull',
      data: result,
    });
  },
);

const updateDeparmentIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const {depermentId}=req.params
    const payload=req.body
    const result = await deparmentService.updateDeparmentIntoDB(depermentId,payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deparment update succesfull',
      data: result,
    });
  },
);


export const deparmentController = {
    getAllDeparmentIntoDB,
    createDeparmentIntoDB,
    getSingleDeparmentIntoDB,
    updateDeparmentIntoDB
};

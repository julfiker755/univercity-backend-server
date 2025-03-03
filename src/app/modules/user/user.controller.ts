import { Request, Response } from 'express';
import { userService } from './user.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  const result = await userService.createUserBD(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});


export const userController = {
  createUser,
};

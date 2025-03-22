import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { authService } from './auth.service';


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUserBD(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login  succesfully',
    data: result,
  });
});

const ChangePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.ChangePasswordDB(req.user.jwtPaylod,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change  succesfully',
    data: result,
  });
});




export const authController = {
  loginUser,
  ChangePassword
};

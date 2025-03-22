import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { authService } from './auth.service';
import config from '../../config';


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUserBD(req.body)
  const {refreshToken,accessToken,needsPasswordChange}=result
  res.cookie('accessToken', accessToken, {
    secure: config.node_env  === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login  succesfully',
    data: {
      refreshToken,
      needsPasswordChange,
    },
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

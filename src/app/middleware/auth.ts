import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../shared/catchAsync';
import { userModel } from '../modules/user/user.model';
import ApiError from '../errors/apiError';
import { UserRole } from '../modules/user/user.interface';


const auth = (...requiredRoles:UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role,id, iat } = decoded?.jwtPaylod;
    // checking if the user is exist
    const user = await userModel.isUserExistsByCustomId(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    if (user?.isDeleted) {
      throw new ApiError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    if (user?.status === 'blocked') {
      throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (
      user.passwordChangedAt &&
      await userModel.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload
    next();
  });
};

export default auth;
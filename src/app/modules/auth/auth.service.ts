import config from '../../config';
import ApiError from '../../errors/apiError';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import  bcrypt from 'bcrypt'
import httpStatus from 'http-status';
import { createToken } from './auth.utils';

const loginUserBD = async (payload: TLoginUser) => {
  // checking if user is exist
  const userInfo = await userModel.isUserExistsByCustomId(payload.id);
  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This User is not found');
  }
  // checking if user deleted
  if (userInfo?.isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, 'The User  Deleted Account');
  }
  // checking if user blocked account
  if (userInfo?.status === 'blocked') {
    throw new ApiError(httpStatus.FORBIDDEN, 'The User blocked Account');
  }
  // checking if the password is correct
  if (
    !(await userModel.isPasswordMatched(payload?.password, userInfo.password))
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Password dot not matched');
  }

  const jwtPaylod = {
    id: userInfo.id,
    role: userInfo.role,
  };
  //  create token and sent to the client
  const accessToken = createToken(jwtPaylod, config.jwt_access_secret as string,'30d')
  const refreshToken = createToken(jwtPaylod, config.jwt_access_secret as string,'10d')
  console.log(refreshToken)

  return {
    refreshToken,
    accessToken,
    needsPasswordChange: userInfo?.needsPasswordChange,
  };
};

// changePasswordDB
const ChangePasswordDB = async (user: any, payload: any) => {
  console.log(user,payload)
  const userInfo = await userModel.isUserExistsByCustomId(user.id);
  if (
    !(await userModel.isPasswordMatched(payload?.oldPassword, userInfo.password))
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Password dot not matched');
  }
  
  const newHastPassword=await bcrypt.hash(payload.newPassword, 10);
  const result = await userModel.findOneAndUpdate({
    id: user.id,
    role: user.role,
  },{
    password:newHastPassword,
    needsPasswordChange:false,
    passwordChangedAt:new Date()
  });
  return  result
};

export const authService = {
  loginUserBD,
  ChangePasswordDB,
};

import { Request, Response } from 'express';
import { userService } from './user.service';



const createUser = async (req: Request, res: Response) => {
  try {
    const {password,student:studentData} = req.body;
    console.log(password,studentData)
    const result = await userService.createUserBD(password,studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const userController = {
  createUser,
};

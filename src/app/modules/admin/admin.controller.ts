import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import  httpStatus  from "http-status";
import { adminService } from "./admin.service";



const getAllAdmins = catchAsync(async (req, res) => {
    const result = await adminService.getAllAdminsFromDB(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admins are retrieved succesfully',
      data: result,
    });
  });

const getSingleAdmin = catchAsync(async (req, res) => {
    const {id}=req.params
    const result = await adminService.getSingleAdminDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single admin Info succesfully',
      data: result,
    });
  });

  export const adminController={
    getAllAdmins,
    getSingleAdmin
  }
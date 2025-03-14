import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import  httpStatus from "http-status";
import { facultyService } from "./faculty.service";


const getAllFaculties = catchAsync(async (req, res) => {
    const result = await facultyService.getAllFacultiesFromDB(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties Info succesfully',
      data: result,
    });
  });
  
  const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await facultyService.getSingleFacultyFromDB( id );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single is retrieved succesfully',
      data: result,
    });
  });



  
export const facultyController = {
    getAllFaculties,
    getSingleFaculty
  };
  
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { courseService } from './course.service';




const createCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await courseService.createCourseIntoBD(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course store succesfull',
      data: result,
    });
  },
);
const getAllCourses = catchAsync(
  async (req: Request, res: Response) => {
    const result = await courseService.getAllCourseFromBD(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course Info succesfull',
      data: result,
    });
  },
);



const updateSingleCourse = catchAsync(
  async (req: Request, res: Response) => {
    const {id}=req.params
    const result = await courseService.updateSingleCourseFromBD(id,req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course update Info succesfull',
      data: result,
    });
  },
);
const getSingleCourse = catchAsync(
  async (req: Request, res: Response) => {
    const {id}=req.params
    const result = await courseService.getSingleCourseFromBD(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course Single  Info succesfull',
      data: result,
    });
  },
);


const deleteCourse = catchAsync(
    async (req: Request, res: Response) => {
      const {id}=req.params
      const result = await courseService.deleteCourseIntoDB(id)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is Delete succesfull',
        data: result,
      });
    },
  );

  
  // assignFaculties
const assignFacultiesCourse = catchAsync(
    async (req: Request, res: Response) => {
      const {courseId}=req.params
      const {faculties}=req.body
      const result = await courseService.assignFacultiesCourseDB(courseId,faculties)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assign Faculties info succesfull',
        data: result,
      });
    },
  );

// removeFacultiesCourse 
const removeFacultiesCourse = catchAsync(
    async (req: Request, res: Response) => {
      const {courseId}=req.params
      const {faculties}=req.body
      const result = await courseService.removeFacultiesCourseDB(courseId,faculties)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties Remove info succesfull',
        data: result,
      });
    },
  );

  // const updateFacultyIntoDB = catchAsync(
//   async (req: Request, res: Response) => {
//     const {facultyId}=req.params
//     const payload=req.body
//     const result = await facultyService.updateFacultyIntoDB(facultyId,payload)
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Faculty update succesfull',
//       data: result,
//     });
//   },
// );

export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateSingleCourse,
    deleteCourse,
    assignFacultiesCourse,
    removeFacultiesCourse
};

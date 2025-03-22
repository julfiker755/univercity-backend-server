import httpStatus from 'http-status';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourseModel } from './OfferedCourse.model';
import { semesterRegistrationModel } from '../semester-registration/semesterRegistration.model';
import ApiError from '../../errors/apiError';
import { deparmentModel } from '../academic-deparment/deparment.model';
import { CourseModel } from '../course/course.model';
import { academicfacultyModel } from '../academic-faculty/faculty.model';
import { FacultyModel } from '../faculty/faculty.model';


const createOfferedCourseIntoDB = async (payload: TOfferedCourse) =>{
  const {semesterRegistration,academicFaculty,academicDepartment,course,faculty}=payload
  // check if the semester registration id is exsis
  const isSemesterRegistrationExsis=await semesterRegistrationModel.findById(semesterRegistration)
  if(!isSemesterRegistrationExsis){
    throw new ApiError(httpStatus.NOT_FOUND,"Semester Registration not found")
  }

   const academicSemester=isSemesterRegistrationExsis.academicSemester

  const isacademicFacultyExsis=await academicfacultyModel.findById(academicFaculty)
  if(!isacademicFacultyExsis){
    throw new ApiError(httpStatus.NOT_FOUND,"Academic Faculty not found")
  }
  const isacademicDepartmentExsis=await deparmentModel.findById(academicDepartment)
  if(!isacademicDepartmentExsis){
    throw new ApiError(httpStatus.NOT_FOUND,"deparment Faculty not found")
  }
  const iscourseExsis=await CourseModel.findById(course)
  if(!iscourseExsis){
    throw new ApiError(httpStatus.NOT_FOUND,"course  not found")
  }
  const isfacultyExsis=await FacultyModel.findById(faculty)
  if(!isfacultyExsis){
    throw new ApiError(httpStatus.NOT_FOUND,"faculty  not found")
  }

  // check if the  deperment is belog to the faclty
  const isDeparmentBelogToFaculty=await deparmentModel.findOne({
    academicFaculty:academicFaculty,
    
  })

  if(!isDeparmentBelogToFaculty){
    throw new ApiError(httpStatus.NOT_FOUND,`This academicDepartment is not belog to this `)
  }
  const result=await OfferedCourseModel.create({...payload,academicSemester})
  return result

}

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {

}

const getMyOfferedCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {}

const getSingleOfferedCourseFromDB = async (id: string) => {}

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {}

const deleteOfferedCourseFromDB = async (id: string) => {}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getMyOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};

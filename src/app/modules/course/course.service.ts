import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourseIntoBD = async (payload:TCourse) => {
  const result = await CourseModel.create();
  return result;
};

const getAllCourseFromBD = async () => {
  const result = await CourseModel.create();
  return result;
};

const getSingleCourseFromBD = async (id: string) => {
  const result = await CourseModel.findById(id)
  return result;
};

const deleteCourseIntoDB=async(id:string)=>{
    const result=await CourseModel.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}

export const courseService = {
  createCourseIntoBD,
  getAllCourseFromBD,
  getSingleCourseFromBD,
  deleteCourseIntoDB
};

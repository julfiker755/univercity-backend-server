import QueryBuilder from '../../builder/queryBuilder';
import { CourseSearchableFields } from './course.constant.';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourseIntoBD = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCourseFromBD = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find().populate("preRequisiteCourses.course"), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromBD = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};

const deleteCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseService = {
  createCourseIntoBD,
  getAllCourseFromBD,
  getSingleCourseFromBD,
  deleteCourseIntoDB,
};

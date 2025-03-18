import mongoose from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { CourseSearchableFields } from './course.constant.';
import { TCourse, TCourseFaculty } from './course.interface';
import { CourseFacultyModel, CourseModel } from './course.model';
import ApiError from '../../errors/apiError';
import httpStatus from 'http-status';

// createCourseIntoBD
const createCourseIntoBD = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

// /getAllCourseFromBD
const getAllCourseFromBD = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

// getSingleCourseFromBD
const getSingleCourseFromBD = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

// deleteCourseIntoDB
const deleteCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateSingleCourseFromBD = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // step1: basic course info update
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failded to update course');
    }

    // check if there  is any pre requisite course of update
    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisiteCourses = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deleteCourse = await CourseModel.findByIdAndUpdate(id, {
        $pull: {
          preRequisiteCourses: {
            course: { $in: deletedPreRequisiteCourses },
          },
        },
      });

      if (!deleteCourse) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failded to delete course');
      }
      // filter out the add fields
      const newreRequisite = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisite = await CourseModel.findByIdAndUpdate(id, {
        $addToSet: {
          preRequisiteCourses: { $each: newreRequisite },
        },
      });

      if (!newPreRequisite) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failded to add course');
      }
    }

    await session.commitTransaction();
    session.endSession();

    const result = await CourseModel.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failded to update course');
  }
};

const assignFacultiesDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(id, {
    $addToSet: { faculties: { $each: payload } },
  },{
    upsert:true,
    new:true
  });

  return result
};


export const courseService = {
  updateSingleCourseFromBD,
  getSingleCourseFromBD,
  createCourseIntoBD,
  getAllCourseFromBD,
  deleteCourseIntoDB,
  assignFacultiesDB,
};

// const updateSingleCourseFromBD = async (
//   id: string,
//   payload: Partial<TCourse>,
// ) => {
//   const { preRequisiteCourses, ...courseRemainingData } = payload;

//   // step1: basic course info update
//   const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
//     id,
//     courseRemainingData,
//     {
//       new: true,
//       runValidators: true,
//     },
//   );
//   // check if there  is any pre requisite course of update
//   if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
//     // filter out the deleted fields
//     const deletedPreRequisiteCourses = preRequisiteCourses
//       .filter((el) => el.course && el.isDeleted)
//       .map((el) => el.course);
//     const deleteCourse=await CourseModel.findByIdAndUpdate(id,
//       {$pull:{preRequisiteCourses:{
//         course:{$in:deletedPreRequisiteCourses}
//       }}}
//     )
//     // filter out the add fields
//     const newreRequisite=preRequisiteCourses?.filter(el=>el.course && !el.isDeleted)

//     const newPreRequisite=await CourseModel.findByIdAndUpdate(id,{
//      $addToSet:{
//        preRequisiteCourses:{$each:newreRequisite}
//      }
//     })
//   }

//   const result=await CourseModel.findById(id).populate("preRequisiteCourses.course")

//   return result;
// };

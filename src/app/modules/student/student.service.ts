import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { userModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/queryBuilder';
import { searchableFields } from './student.constant';

// getAllStudentFromBD
const getAllStudentFromBD = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDeparment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

// singleStudentIntoBD
const singleStudentIntoBD = async (id: string) => {
  const result = await StudentModel.findById({ _id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDeparment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// deleteStudentIntoBD
const deleteStudentIntoBD = async (id: string) => {
  const sesstion = await mongoose.startSession();
  try {
    sesstion.startTransaction();
    const studentResult = await StudentModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, sesstion },
    );

    await userModel.findOneAndUpdate(
      { _id: studentResult?.user },
      { isDeleted: true },
      { new: true, sesstion },
    );
    await sesstion.commitTransaction();
    await sesstion.endSession();
    return studentResult;
  } catch (err) {
    await sesstion.abortTransaction();
    await sesstion.endSession();
  }
};

//updateStudentIntoBD
const updateStudentIntoBD = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifyUpdateData: Record<string, unknown> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { _id: id },
    modifyUpdateData,
    { new: true },
  );
  return result;
};

export const StudentService = {
  getAllStudentFromBD,
  deleteStudentIntoBD,
  singleStudentIntoBD,
  updateStudentIntoBD,
};

// row search,filter,sort,skip,limit,select
// const getAllStudentFromBD = async (query: Record<string, unknown>) => {
//   let search = '';
//   const queryObj={...query}

//   if (query.search) {
//     search = query?.search as string;
//   }
//   // console.log(search);

//   const searchQuery = StudentModel.find({
//     $or: ['email', 'name.firstname'].map((field) => ({
//       [field]: { $regex: search, $options: 'i' },
//     })),
//   });

//   // filtering
//   const excludeFields=['search','sort','limit','page','fields']
//   excludeFields.forEach(el=>delete queryObj[el])

//   const filterQuery =searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDeparment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   let sort= "-createdAt"
//   if(query.sort){
//     sort=query.sort as string
//   }
//   const sortQuery=filterQuery.sort(sort)
//   let limit=1
//   let page=1
//   let skip=0

//   if(query.limit){
//     limit=Number(query.limit)
//   }

//   if(query.page){
//     page=Number(query.page)
//     skip=(page-1)*limit
//   }

//   const paginateQuery=sortQuery.skip(skip)
//   const limiQuery=paginateQuery.limit(limit)

//   let fields="-__v"
//   if(query.fields){
//     fields=(query.fields as string).split(",").join(' ')
//   }
//   const fieldQuery=await limiQuery.select(fields)
//   return fieldQuery;
// };

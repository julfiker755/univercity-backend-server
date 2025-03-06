import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
import { userModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await userModel
    .findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({ createdAt: -1 })
    .lean();
  //  2030 01 0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId =(0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); //2023
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const currentYear = payload.year;
  const currentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId=lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
// import { userModel } from './user.model';

// const findLastStudentId = async () => {
//   const lastStudent = await userModel
//     .findOne(
//       {
//         role: 'student',
//       },
//       {
//         id: 1,
//         _id: 0,
//       },
//     )
//     .sort({ createdAt: -1 })
//     .lean();
// //  2030 01 0001
//   return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
// };

// export const generateStudentId = async (payload: TAcademicSemester) => {
//   const currentId = (await findLastStudentId()) || 0;
//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
//   incrementId = `${payload.year}${payload.code}${incrementId}`;
//   return incrementId;
// };
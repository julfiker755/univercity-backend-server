import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

//  export type TAcademicSemesterName= 'Autumn' | 'Summar' | 'Fall'
//   export type TAcademicSemesterCode= '01' | '02' | '03'

const createAcademicSemester = async (payload: TAcademicSemester) => {
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
  };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invaild Semester Code');
  }

  const result = await academicSemesterModel.create(payload);
  return result;
};

export const academicSemesterService = {
  createAcademicSemester,
};

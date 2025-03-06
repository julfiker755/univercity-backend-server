import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

// getAllAcademicSemester
const getAllAcademicSemester = async () => {
  const result = await academicSemesterModel.find();
  return result;
};

// createAcademicSemester
const createAcademicSemester = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invaild Semester Code');
  }

  const result = await academicSemesterModel.create(payload);
  return result;
};

// getOneAcademicSemester
const getOneAcademicSemester = async (id: string) => {
  const result = await academicSemesterModel.findById(id);
  return result;
};

//  updateAcademicSemester
const updateAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  const result = await academicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicSemesterService = {
  getAllAcademicSemester,
  createAcademicSemester,
  getOneAcademicSemester,
  updateAcademicSemester,
};

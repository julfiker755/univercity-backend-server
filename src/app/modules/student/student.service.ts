
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentBD = async (student: TStudent) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromBD = async () => {
  const result = await StudentModel.find();
  return result;
};

export const StudentService = {
  createStudentBD,
  getAllStudentFromBD,
};

import { StudentModel } from './student.model';



const getAllStudentFromBD = async () => {
  const result = await StudentModel.find();
  return result;
};

export const StudentService = {
  getAllStudentFromBD,
};

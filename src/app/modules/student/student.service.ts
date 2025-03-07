import { StudentModel } from './student.model';

const getAllStudentFromBD = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path:"academicDeparment",
      populate:{
        path:"academicFaculty"
      }
    });
  return result;
};

export const StudentService = {
  getAllStudentFromBD,
};

import { TFacuty } from './faculty.interface';
import { academicfacultyModel } from './faculty.model';


// createFacultyIntoDB
const createFacultyIntoDB = async (payload: TFacuty) => {
  const result = await academicfacultyModel.create(payload);
  return result;
};
// getAllFacultyIntoDB
const getAllFacultyIntoDB = async () => {
  const result = await academicfacultyModel.find();
  return result;
};
// getSingleFacultyIntoDB
const getSingleFacultyIntoDB = async (id: string) => {
  const result = await academicfacultyModel.findById(id);
  return result;
};
const updateFacultyIntoDB = async (id: string, payload: Partial<TFacuty>) => {
    const result = await academicfacultyModel.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        },
      );
  return result;
};

export const facultyService = {
  getAllFacultyIntoDB,
  createFacultyIntoDB,
  getSingleFacultyIntoDB,
  updateFacultyIntoDB,
};

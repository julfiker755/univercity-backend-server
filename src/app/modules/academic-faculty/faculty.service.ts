import { TFacuty } from './faculty.interface';
import { facultyModel } from './faculty.model';

// createFacultyIntoDB
const createFacultyIntoDB = async (payload: TFacuty) => {
  const result = await facultyModel.create(payload);
  return result;
};
// getAllFacultyIntoDB
const getAllFacultyIntoDB = async () => {
  const result = await facultyModel.find();
  return result;
};
// getSingleFacultyIntoDB
const getSingleFacultyIntoDB = async (id: string) => {
  const result = await facultyModel.findById(id);
  return result;
};
const updateFacultyIntoDB = async (id: string, payload: Partial<TFacuty>) => {
  const result = await facultyModel.findOneAndUpdate({
    _id: id,
    payload,
    new: true,
  });
  return result;
};

export const facultyService = {
  getAllFacultyIntoDB,
  createFacultyIntoDB,
  getSingleFacultyIntoDB,
  updateFacultyIntoDB,
};

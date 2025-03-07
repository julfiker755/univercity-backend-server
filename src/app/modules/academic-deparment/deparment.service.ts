import { TDeparment } from './deparment.interface';
import { deparmentModel } from './deparment.model';

// createDeparmentIntoDB
const createDeparmentIntoDB = async (payload: TDeparment) => {
  const result = await deparmentModel.create(payload);
  return result;
};
// getAllDeparmentIntoDB
const getAllDeparmentIntoDB = async () => {
  const result = await deparmentModel.find().populate("academicFaculty");
  return result;
};
// getSingleDeparmentIntoDB
const getSingleDeparmentIntoDB = async (id: string) => {
  const result = await deparmentModel.findById(id).populate("academicFaculty")
  return result;
};
// updateDeparmentIntoDB
const updateDeparmentIntoDB = async (
  id: string,
  payload:Partial<TDeparment>,
) => {
  const result = await deparmentModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const deparmentService = {
  getAllDeparmentIntoDB,
  createDeparmentIntoDB,
  getSingleDeparmentIntoDB,
  updateDeparmentIntoDB,
};

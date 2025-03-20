/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { academicSemesterModel } from '../academic-semester/academicSemester.model';
import ApiError from '../../errors/apiError';
import { semesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/queryBuilder';
import { registrationStatus } from './semesterRegistration.constant';

// createSemesterRegistrationIntoDB
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // check if threre andy registerend semster that is alreay 'Upcoming
  const isThereAnyUpcomingoingSemester =
    await semesterRegistrationModel.findOne({
      $or: [
        {
          status: registrationStatus.UPCOMING,
        },
        {
          status: registrationStatus.ONGOING,
        },
      ],
    });

  if (isThereAnyUpcomingoingSemester) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `There is Already a ${isThereAnyUpcomingoingSemester?.status} Registered Semester `,
    );
  }
  const academicSemesterId = payload?.academicSemester;
  const isSemesterRegisterExsis = await semesterRegistrationModel.findOne({
    academicSemester: academicSemesterId,
  });
  if (isSemesterRegisterExsis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This  semester Alreay Exsis');
  }
  // check if the semester is exsis
  const isAcademicSemesterExsis =
    await academicSemesterModel.findById(academicSemesterId);
  if (!isAcademicSemesterExsis) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'This Academic semester not found',
    );
  }

  const result = await semesterRegistrationModel.create(payload);
  return result;
};

// getAllSemesterRegistrationsFromDB
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await semesterRegistrationModel.findById(id);
  return result;
};



// updateSemesterRegistrationIntoDB
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // if the requested semester registeration is ended,we will not update anything
  const currentSemesterStatus = await semesterRegistrationModel.findById(id);
  const requestedStatus = payload.status;
  if (currentSemesterStatus?.status === registrationStatus.ENDED) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `This semester is already ${currentSemesterStatus?.status}`,
    );
  }
  // UPCOMING --> ONGOING-->ENDED
  if (
    currentSemesterStatus?.status == registrationStatus.ONGOING &&
    requestedStatus == registrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `You can not directly change status from ${currentSemesterStatus?.status}
       to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterStatus?.status == registrationStatus.ONGOING &&
    requestedStatus == registrationStatus.UPCOMING
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `You can not directly change status from ${currentSemesterStatus?.status}
       to ${requestedStatus}`,
    );
  }
//   main work
const result=await semesterRegistrationModel.findByIdAndUpdate(id,payload,{
    new:true,
    runValidators:true
})

return result
};

const deleteSemesterRegistrationFromDB = async (id: string) => {};



export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};

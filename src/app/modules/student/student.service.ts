import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { userModel } from '../user/user.model';
import { TStudent } from './student.interface';

// getAllStudentFromBD
const getAllStudentFromBD = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDeparment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
// singleStudentIntoBD
const singleStudentIntoBD = async (id:string) => {
  const result = await StudentModel.findById({_id:id})
    .populate('admissionSemester')
    .populate({
      path: 'academicDeparment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// deleteStudentIntoBD
const deleteStudentIntoBD = async (id: string) => {
  const sesstion = await mongoose.startSession();
  try {
    sesstion.startTransaction();
    const studentResult = await StudentModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, sesstion },
    );
    
    await userModel.findOneAndUpdate(
      { _id: studentResult?.user },
      { isDeleted: true },
      { new: true, sesstion },
    );
    await sesstion.commitTransaction()
    await sesstion.endSession()
    return studentResult
  } catch (err) {
   await sesstion.abortTransaction()
   await sesstion.endSession()
  }
};

//updateStudentIntoBD
const updateStudentIntoBD=async(id:string,payload:Partial<TStudent>)=>{
  const {name,guardian,localGuardian,...remainingStudentData}=payload
  const modifyUpdateData:Record<string,unknown>={...remainingStudentData}
  
  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifyUpdateData[`name.${key}`]=value
    }
  }
  if(guardian && Object.keys(guardian).length){
    for(const [key,value] of Object.entries(guardian)){
      modifyUpdateData[`guardian.${key}`]=value
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key,value] of Object.entries(localGuardian)){
      modifyUpdateData[`localGuardian.${key}`]=value
    }
  }

 const result=await StudentModel.findOneAndUpdate({_id:id},modifyUpdateData,{new:true})
 return result
}

export const StudentService = {
  getAllStudentFromBD,
  deleteStudentIntoBD,
  singleStudentIntoBD,
  updateStudentIntoBD
};

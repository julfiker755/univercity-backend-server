import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, 'FirstName is required'] },
  middleName: { type: String, required: [true, 'MiddleName is required'] },
  lastName: { type: String, required: [true, 'LastName is required'] },
},{ _id: false });

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
},{ _id: false });

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
}, { _id: false });

const studentSchema = new Schema<TStudent>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref:'User'
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid ',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
      message: '{VALUE} is not valid ',
    },
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg:{ type: String, required: true },
  admissionSemester:{
    type: Schema.Types.ObjectId,
    required: [true, 'Semester id is required'],
    unique: true,
    ref:'academicSemester'
  },
  academicDeparment:{
    type: Schema.Types.ObjectId,
    required: [true, 'deparment id is required'],
    unique: true,
    ref:'deparment'
  },
  isDeleted: { type: Boolean, default: false },
},{
  timestamps:true
});

export const StudentModel = model<TStudent>('Student', studentSchema);

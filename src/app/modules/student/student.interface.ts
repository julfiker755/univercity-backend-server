import { Types } from "mongoose";


export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};


export type LocalGuardian ={
   name:string;
   occupation:string;
   contactNo:string;
   address:string;
}

export type TStudent = {
  id: string;
  user:Types.ObjectId;
  password:string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian:LocalGuardian;
  profileImg?:string;
  admissionSemester:Types.ObjectId
  academicDeparment:Types.ObjectId
  isDeleted:boolean
};

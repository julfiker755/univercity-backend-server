import { Types } from 'mongoose';
import { z } from 'zod';

// Custom validator for MongoDB ObjectId
const objectIdSchema = z.custom<Types.ObjectId>(
  (val) => Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId" }
);

// Define the UserName schema
const userNameSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  middleName: z.string().min(1, { message: "Middle Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
});

// Define the Guardian schema
const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father Name is required" }),
  fatherOccupation: z.string().min(1, { message: "Father Occupation is required" }),
  fatherContactNo: z.string().min(1, { message: "Father Contact No is required" }),
  motherName: z.string().min(1, { message: "Mother Name is required" }),
  motherOccupation: z.string().min(1, { message: "Mother Occupation is required" }),
  motherContactNo: z.string().min(1, { message: "Mother Contact No is required" }),
});

// Define the LocalGuardian schema
const localGuardianSchema = z.object({
  name: z.string().min(1, { message: "Local Guardian Name is required" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  contactNo: z.string().min(1, { message: "Contact No is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});

// Define the Student schema
const studentSchema = z.object({
  password:z.string().min(1,{ message: "password is required" }),
  student:z.object({
  name: userNameSchema,
  gender: z.enum(['male', 'female'], { message: "Gender must be 'male' or 'female'" }),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: "Invalid email format" }),
  contactNumber: z.string().min(1, { message: "Contact Number is required" }),
  emergencyContactNo: z.string().min(1, { message: "Emergency Contact No is required" }),
  bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], { message: "Invalid blood group" }),
  presentAddress: z.string().min(1, { message: "Present Address is required" }),
  permanentAddress: z.string().min(1, { message: "Permanent Address is required" }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().url({ message: "Invalid URL for Profile Image" }).optional(),
  })
});

// Export the Zod validation schema for Student
export const studentValidations = {
  studentSchema
};

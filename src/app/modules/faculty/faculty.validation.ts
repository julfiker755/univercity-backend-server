import { z } from 'zod';
import { BloodGroup, Gender } from '../admin/admin.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }),
});

export const createFacultyValidationSchema = z.object({
  password: z.string().max(20, { message: 'Password must be at most 20 characters' }),
  faculty: z.object({
    name: createUserNameValidationSchema,
    designation: z.string({ required_error: 'Designation is required' }),
    gender: z.enum([...Gender] as [string, ...string[]], {
      required_error: 'Gender is required',
      invalid_type_error: 'Invalid gender value',
    }),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }),
    contactNo: z.string({ required_error: 'Contact number is required' }),
    emergencyContactNo: z.string({ required_error: 'Emergency contact number is required' }),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]], {
      required_error: 'Blood group is required',
      invalid_type_error: 'Invalid blood group',
    }),
    presentAddress: z.string({ required_error: 'Present address is required' }),
    permanentAddress: z.string({ required_error: 'Permanent address is required' }),
    academicDepartment: z.string({ required_error: 'Academic department is required' }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
      invalid_type_error: 'Invalid academic faculty value',
    }),
    profileImg: z.string().optional(),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
};

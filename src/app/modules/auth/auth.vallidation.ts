import { z } from 'zod';

const loginSchema = z.object({
  id: z.string({
    invalid_type_error: 'id must be string',
    required_error: 'Id is Required',
  }),
  password: z.string({
    invalid_type_error: 'password must be string',
    required_error: 'Password is Required',
  }),
});
const changePasswordSchema = z.object({
  oldPassword: z.string({
    invalid_type_error: 'id must be string',
    required_error: 'Old Password is Required',
  }),
  newPassword: z.string({
    invalid_type_error: 'password must be string',
    required_error: 'New passwordd is Required',
  }),
});

export const authValidation = {
  loginSchema,
  changePasswordSchema
};

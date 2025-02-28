import { z } from 'zod';

const userSchema = z.object({
  password: z
    .string({
        invalid_type_error:"Passowrd must be string"
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

export const userValidation = {
  userSchema,
};

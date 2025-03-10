import { z } from 'zod';

const deparmentSchema = z.object({
    name: z
    .string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty:z.string({
        invalid_type_error: 'academicFaculty is required',
        required_error: 'AcademicFaculty is required',
      })
});

const deparmentupdateSchema = z.object({
    name: z
    .string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }).optional(),
    academicFaculty:z.string({
        invalid_type_error: 'academicFaculty is required',
        required_error: 'AcademicFaculty is required',
      }).optional()
});

export const deparmentValidation = {
    deparmentupdateSchema,
    deparmentSchema
};

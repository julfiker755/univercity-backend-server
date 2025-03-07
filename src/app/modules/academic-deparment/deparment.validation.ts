import { z } from 'zod';

const deparmentSchema = z.object({
    name:z.string().min(1,{ message: "Name is required" }),
    academicFaculty:z.string().min(1,{ message: "academicFaculty is required" }),

});
const deparmentupdateSchema = z.object({
    name:z.string().min(1,{ message: "Name is required" }).optional(),
    academicFaculty:z.string().min(1,{ message: "academicFaculty is required" }).optional(),

});

export const deparmentValidation = {
    deparmentupdateSchema,
    deparmentSchema
};

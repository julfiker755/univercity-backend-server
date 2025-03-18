import { z } from "zod";

const preRequisiteCourseSchema = z.object({
    course: z.string({ required_error: 'Course is required' }),
    isDeleted: z.boolean().optional()
});

const createCourseValidationSchema = z.object({
    title: z.string({ required_error: 'Title is required' }),
    prefix: z.string({ required_error: 'Prefix is required' }),
    code: z.number().int().positive({ message: 'Code must be a positive integer' }), 
    credits: z.number().positive({ message: 'Credits must be a positive number' }), 
    preRequisiteCourses: z.array(preRequisiteCourseSchema).optional(),
    isDeleted:z.boolean().optional()
    
});

const updateCourseValidationSchema=createCourseValidationSchema.partial()


export const courseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema
};

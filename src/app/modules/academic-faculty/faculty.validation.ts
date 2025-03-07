import { z } from 'zod';

const facultySchema = z.object({
    name:z.string().min(1,{ message: "Name is required" }),
});

export const facultyValidation = {
    facultySchema,
};

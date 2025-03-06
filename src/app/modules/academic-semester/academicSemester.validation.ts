import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';


const academicSemesterSchema = z.object({
    name:z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    code:z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    year:z.string(),
    startMonth:z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth:z.enum([...Months] as [string, ...string[]]).optional(),

});

export const academicSemesterValidation = {
    academicSemesterSchema,
};



import { Schema, model } from 'mongoose';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';


const academicSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: AcademicSemesterName },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    year: { type:String, required: true },
    startMonth: { type: String, required: true, enum: Months },
    endMonth: { type: String, required: true, enum: Months },
  },
  {
    timestamps: true,
  },
);

academicSchema.pre('save',async function(next){
  const isSemesterExsis=await academicSemesterModel.findOne({
    name:this.name,
    year:this.year
  })

  if(isSemesterExsis){
    throw new Error("Semester is already exsis!")
  }
  next()
})


export const academicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSchema,
);

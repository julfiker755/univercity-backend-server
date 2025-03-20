import mongoose, { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'academicSemester',
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    default: 'UPCOMING',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
minCredit:{
    type:Number,
    required:true,
    default:3
},
maxCredit:{
    type:Number,
    required:true,
    default:15
}
},{
    timestamps:true
});


export const semesterRegistrationModel = model<TSemesterRegistration>(
    'semesterRegistration',
    semesterRegistrationSchema,
  );
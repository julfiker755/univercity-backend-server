import { model, Schema } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCourses = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false},
);

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCourses],
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  timestamps: true
});

export const CourseModel = model<TCourse>('course', courseSchema);

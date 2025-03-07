import { Schema, model} from 'mongoose';
import { TFacuty } from './faculty.interface';


const facultySchema = new Schema<TFacuty>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);



export const facultyModel = model<TFacuty>('facuty',facultySchema);

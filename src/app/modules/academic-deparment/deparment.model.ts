import { Schema, model} from 'mongoose';
import { TDeparment} from './deparment.interface';


const deparmentSchema = new Schema<TDeparment>(
  {
    name:{type: String, required: true},
    academicFaculty:{
       type:Schema.Types.ObjectId,
       ref:"academicfacuty"
    }
  },
  {
    timestamps: true,
  },
);

deparmentSchema.pre("save",async function(next){
  const isDeparmentExsis=await deparmentModel.findOne({name:this.name})
  if(isDeparmentExsis){
    throw new Error("This deparment is already exist!")
  }
  next()
})

deparmentSchema.pre("findOneAndUpdate",async function(next){
 const query=this.getQuery()
 const isDeparmentExsis=await deparmentModel.findOne(query)
 if(!isDeparmentExsis){
   throw new Error("This deparment does not exsis!")
 }
 next()
})




export const deparmentModel = model<TDeparment>('deparment',deparmentSchema);

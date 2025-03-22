import { Schema, model} from 'mongoose';
import { TUser, UserModels } from './user.interface';
import bcrypt from 'bcrypt';


const userSchema = new Schema<TUser,UserModels>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true,select:0 },
    needsPasswordChange: { type: Boolean, default: false },
    passwordChangedAt: {type:Date},
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next()
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId=async function (id:string) {
 return await userModel.findOne({id}).select('+password')
}
 userSchema.statics.isPasswordMatched=async function (plainTextPassword,hashedPassword) {
 return await bcrypt.compare(plainTextPassword,hashedPassword)
 }

 userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const userModel = model<TUser,UserModels>('User', userSchema);

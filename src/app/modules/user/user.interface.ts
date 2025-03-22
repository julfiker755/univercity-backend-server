import { Model } from 'mongoose';

export type UserRole = 'admin' | 'student' | 'faculty';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: UserRole;
  status: 'in-progress' | 'blocked';
  passwordChangedAt?: Date;
  isDeleted: boolean;
}

export interface UserModels extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): Promise<boolean>;
}

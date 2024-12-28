import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "./user.interface";

interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.BUYER,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IUserModel>("User", UserSchema);

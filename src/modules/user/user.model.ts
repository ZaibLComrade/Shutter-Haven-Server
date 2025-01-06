import mongoose, { Schema, Document } from "mongoose";
import { UserRole, ICartItem } from "./user.interface";
import { CartItemSchema } from "../cart/cart.schema";

interface IUserModel extends Document {
	name: string;
	email: string;
	password: string;
	role: UserRole;
	cart: ICartItem[];
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
		cart: { type: [CartItemSchema], default: [] }, // Array of cart items
	},
	{ timestamps: true }
);

export default mongoose.model<IUserModel>("User", UserSchema);

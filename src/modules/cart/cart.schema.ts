import { Schema } from "mongoose";

export const CartItemSchema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true, min: 1 },
});

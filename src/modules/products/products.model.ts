import mongoose, { Schema, Document } from "mongoose";

interface ISpecs {
	megapixels: number;
	sensor_type: string;
	video_resolution: string;
	iso_range: string;
	weight: string;
}

export interface IProduct extends Document {
	createdBy: string;
	name: string;
	category: string;
	price: number;
	currency: string;
	brand: string;
	description: string;
	specs: ISpecs;
	stock: number;
	rating: number;
	images: string[];
	featured: boolean;
}

const SpecsSchema: Schema = new Schema({
	megapixels: { type: Number, required: true },
	sensor_type: { type: String, required: true },
	video_resolution: { type: String, required: true },
	iso_range: { type: String, required: true },
	weight: { type: String, required: true },
});

const ProductSchema: Schema = new Schema(
	{
		createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
		name: { type: String, required: true },
		category: { type: String, required: true },
		price: { type: Number, required: true },
		currency: { type: String, required: true },
		brand: { type: String, required: true },
		description: { type: String, required: true },
		specs: { type: SpecsSchema, required: true },
		stock: { type: Number, required: true },
		rating: { type: Number, required: true },
		images: { type: [String], required: true },
		featured: { type: Boolean, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);

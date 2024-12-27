export interface IProduct {
	id: string;
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

export interface ISpecs {
	megapixels: number;
	sensor_type: string;
	video_resolution: string;
	iso_range: string;
	weight: string;
}

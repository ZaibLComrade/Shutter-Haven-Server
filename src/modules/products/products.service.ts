import Product, { IProduct } from "./products.model";

export const createProduct = async (data: IProduct) => {
	try {
		return await Product.create(data);
	} catch (err) {
		console.log(err);
	}
};

export const getAllProducts = async () => {
	return await Product.find();
};

export const getProductById = async (id: string) => {
	return await Product.findById(id);
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
	return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
	return await Product.findByIdAndDelete(id);
};

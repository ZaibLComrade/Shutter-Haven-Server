import Product, { IProduct } from "./products.model";

export const createProduct = async (data: IProduct, userId: string) => {
	try {
		return await Product.create({ ...data, createdBy: userId });
	} catch (err) {
		console.log(err);
	}
};

export const getAllProducts = async (query?: any = {}) => {
	return await Product.find(query);
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

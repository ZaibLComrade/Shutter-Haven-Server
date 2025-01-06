import catchAsync from "../../utils/catchAsync";
import ApiError from "../../utils/ApiError";
import { Request, Response } from "express";
import * as ProductService from "./products.service";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
	const userId = req?.user.id;
	const data = await ProductService.createProduct(req.body, userId);
	if (!data) throw new ApiError(400, "Could not create product");
	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Product created successfully",
		data,
	});
});

export const getAllProducts = catchAsync(
	async (req: Request, res: Response) => {
		const query: { createdBy?: string } = {};
		const userId = req.query.id
		if(userId) query.createdBy = userId as string;

		const data = await ProductService.getAllProducts(query);
		if (!data) throw new ApiError(404, "Products not found");
		res.status(200).json({
			succcess: true,
			statusCode: 200,
			message: "Products retreived successfully",
			data,
		});
	}
);

export const getProductById = catchAsync(
	async (req: Request, res: Response) => {
		const data = await ProductService.getProductById(req.params.id);
		if (!data) throw new ApiError(404, "Product not found");
		res.status(200).json({
			succcess: true,
			statusCode: 200,
			message: "Product retreived successfully",
			data,
		});
	}
);

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
	const data = await ProductService.updateProduct(req.params.id, req.body);
	if (!data) {
		res.status(404).json({ error: "Product not found" });
	}
	res.status(200).json({
		succcess: true,
		statusCode: 200,
		message: "Product deleted successfully",
		data,
	});
});

export const deleteProduct = async (req: Request, res: Response) => {
	const data = await ProductService.deleteProduct(req.params.id);
	if (!data) {
		throw new ApiError(404, "Product not found");
	}
	res.status(200).json({
		succcess: true,
		statusCode: 200,
		message: "Product deleted successfully",
		data,
	});
};

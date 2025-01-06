import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import ApiError from "../../utils/ApiError";
import { addToCart, removeFromCart, getCart, updateCartQuantity } from "./cart.service";

export const addItemToCart = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.id; // Assuming req.user is set by auth middleware
	const { productId, quantity } = req.body;

	if (!productId || !quantity) {
		throw new ApiError(400, "Product ID and quantity are required");
	}

	const data = await addToCart(userId, productId, quantity);

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Item added to cart successfully",
		data,
	});
});

export const removeItemFromCart = catchAsync(
	async (req: Request, res: Response) => {
		const userId = req.user?.id; // Assuming req.user is set by auth middleware
		const { productId } = req.params;

		if (!productId) {
			throw new ApiError(400, "Product ID is required");
		}

		const data = await removeFromCart(userId, productId);

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Item removed from cart successfully",
			data,
		});
	}
);

export const getUserCart = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.id; // Assuming req.user is set by auth middleware

	const data = await getCart(userId);

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Cart retrieved successfully",
		data,
	});
});

export const updateCartItemQuantity = catchAsync(
	async (req: Request, res: Response) => {
		const userId = req.user?.id; // Assuming this comes from your auth middleware
		const { productId } = req.params;
		const { quantity } = req.body;

		if (!quantity || quantity < 1) {
			throw new ApiError(400, "Quantity must be a positive number");
		}

		const data = await updateCartQuantity(
			userId,
			productId,
			quantity
		);

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Cart quantity updated successfully",
			data,
		});
	}
);

import ApiError from "../../utils/ApiError";
import User from "../user/user.model";

export const addToCart = async (
	userId: string,
	productId: string,
	quantity: number
) => {
	const user = await User.findById(userId);
	if (!user) throw new ApiError(404, "User not found");

	const cartItem = user.cart.find(
		(item) => item.product.toString() === productId
	);
	if (cartItem) {
		cartItem.quantity += quantity; // Update quantity if item exists
	} else {
		user.cart.push({ product: productId, quantity }); // Add new item
	}

	await user.save();
	return user.cart;
};

export const removeFromCart = async (userId: string, productId: string) => {
	const user = await User.findByIdAndUpdate(
		userId,
		{ $pull: { cart: { product: productId } } },
		{ new: true }
	);
	if (!user) throw new ApiError(404, "User not found");
	return user.cart;
};

export const getCart = async (userId: string) => {
	const user = await User.findById(userId).populate("cart.product");
	if (!user) throw new ApiError(404, "User not found");
	return user.cart;
};

export const updateCartQuantity = async (
	userId: string,
	productId: string,
	quantity: number
) => {
	const user = await User.findOneAndUpdate(
		{
			_id: userId,
			"cart.product": productId,
		},
		{
			$set: { "cart.$.quantity": quantity },
		},
		{
			new: true,
		}
	).populate("cart.product");

	if (!user) throw new ApiError(404, "User or product in cart not found");
	return user.cart;
};

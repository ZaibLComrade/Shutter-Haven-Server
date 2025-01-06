import { Router } from "express";
import {
	addItemToCart,
	getUserCart,
	removeItemFromCart,
	updateCartItemQuantity,
} from "./cart.controller";
import { verifyUser } from "../../middlewares/verifyUser";
import { verifyRole } from "../../middlewares/verifyRole";
import { userRole } from "../../constants/userRole";

const cartRouter = Router();

cartRouter.get("/", verifyUser, verifyRole([userRole.BUYER]), getUserCart);
cartRouter.post("/", verifyUser, verifyRole([userRole.BUYER]), addItemToCart);
cartRouter.patch(
	"/:productId",
	verifyUser,
	verifyRole([userRole.BUYER]),
	updateCartItemQuantity
);
cartRouter.delete(
	"/:productId",
	verifyUser,
	verifyRole([userRole.BUYER]),
	removeItemFromCart
);

export default cartRouter;

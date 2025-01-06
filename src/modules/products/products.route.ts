import { Router } from "express";
import * as ProductController from "./products.controller";
import { verifyRole } from "../../middlewares/verifyRole";
import { verifyUser } from "../../middlewares/verifyUser";
import { userRole } from "../../constants/userRole";

const productsRoute = Router();

productsRoute.post(
	"/",
	verifyUser,
	verifyRole([userRole.SELLER]),
	ProductController.createProduct
);
productsRoute.get("/", ProductController.getAllProducts);
productsRoute.get("/:id", ProductController.getProductById);
productsRoute.put(
	"/:id",
	verifyUser,
	verifyRole([userRole.SELLER]),
	ProductController.updateProduct
);
productsRoute.delete(
	"/:id",
	verifyUser,
	verifyRole([userRole.SELLER]),
	ProductController.deleteProduct
);

export default productsRoute;

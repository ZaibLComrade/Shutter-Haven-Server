import { Router } from "express";
import * as ProductController from "./products.controller";

const productsRoute = Router();

productsRoute.post("/", ProductController.createProduct);
productsRoute.get("/", ProductController.getAllProducts);
productsRoute.get("/:id", ProductController.getProductById);
productsRoute.put("/:id", ProductController.updateProduct);
productsRoute.delete("/:id", ProductController.deleteProduct);

export default productsRoute;

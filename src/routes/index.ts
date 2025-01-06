import { RequestHandler, Router } from "express";
import productsRoute from "../modules/products/products.route";
import { authRouter, userRouter } from "../modules/user/user.route";
import cartRouter from "../modules/cart/cart.route";

interface Route {
	path: string;
	reqHandler: RequestHandler;
}

const router = Router();

const routes: Route[] = [
	{
		path: "/products",
		reqHandler: productsRoute,
	},
	{
		path: "/auth",
		reqHandler: authRouter,
	},
	{
		path: "/users",
		reqHandler: userRouter,
	},
	{
		path: "/cart",
		reqHandler: cartRouter,
	}
];

routes.forEach(({ path, reqHandler }: Route) => {
	router.use(path, reqHandler);
});

export default router;

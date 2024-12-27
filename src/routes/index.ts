import {RequestHandler, Router} from "express";
import productsRoute from "../modules/products/products.route";

interface Route {
	path: string;
	reqHandler: RequestHandler
}

const router = Router();

const routes: Route[] = [
	{
		path: "/products",
		reqHandler: productsRoute,
	}
]

routes.forEach(({ path, reqHandler }: Route) => {
	router.use(path, reqHandler);
})

export default router;

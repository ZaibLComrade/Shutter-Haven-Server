import {RequestHandler, Router} from "express";

interface Route {
	path: string;
	reqHandler: RequestHandler
}

const router = Router();

const routes: Route[] = [

]

routes.forEach(({ path, reqHandler }: Route) => {
	router.use(path, reqHandler);
})

export default router;

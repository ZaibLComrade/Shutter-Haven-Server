import { AsyncReqHandler } from "@types";
import { NextFunction, Response, Request } from "express";

// Custom request handler
const catchAsync = (reqHandler: AsyncReqHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(reqHandler(req, res, next)).catch((err) => {
			next(err);
		});
	};
};

export default catchAsync

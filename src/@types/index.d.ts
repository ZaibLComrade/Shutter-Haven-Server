import { NextFunction, Request, Response } from "express";

export type AsyncReqHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>;

export type TSearchQuery = {
	[key?: string]: string,
	_id?: string,
	user?: string,
}

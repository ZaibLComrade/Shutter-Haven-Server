import { config } from "../config";
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

export const verifyUser = (req: any, res: Response, next: NextFunction) => {
	const token = req.header("Authorization")?.split(" ")[1];
	console.log(token);

	if (!token) {
		res.status(401).json({
			success: false,
			statusCode: 401,
			message: "Access Denied",
		});
	}

	try {
		const secret = config.jwt_secret;
		const user = jwt.verify(token, secret);
		req.user = user;
		next();
	} catch (error) {
		res.status(403).json({
			success: false,
			statusCode: 403,
			message: "Invalid Token",
		});
	}
};

import { Response, NextFunction } from "express";

export const verifyRole = (roles: string[]) => {
	return (req: any, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role)) {
			res.status(403).json({
				success: false,
				statusCode: 403,
				message: "Forbidden",
			});
		}
		next();
	};
};

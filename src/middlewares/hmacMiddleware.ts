import { Request, Response, NextFunction } from "express";
import verifyHmac from "../utils/verifyHmac";

/**
 * Middleware to authenticate requests using HMAC
 */
const hmacMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const clientId = req.headers["x-client-id"] as string | undefined;
	const timestamp = req.headers["x-timestamp"] as string | undefined;
	const providedHmac = req.headers["x-hmac-signature"] as string | undefined;
	console.log({ clientId, timestamp, providedHmac });

	if (!clientId || !timestamp || !providedHmac) {
		res.status(401).json({ message: "Missing authentication headers" });
		return;
	}

	if (!verifyHmac(clientId, timestamp, providedHmac)) {
		res.status(401).json({
			message: "Invalid HMAC signature or expired timestamp",
		});
		return;
	}
	
	next();
};

export default hmacMiddleware;

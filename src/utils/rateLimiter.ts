import rateLimit from "express-rate-limit";;

export const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: "Too many request, please try again later",
	standardHeaders: true,
	legacyHeaders: false,
})
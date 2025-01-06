import slowDown from "express-slow-down";

export const speedLimiter = slowDown({
	windowMs: 15 * 60 * 1000,
	delayAfter: 50,
	delayMs: hits => hits * 100,
})

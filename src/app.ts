import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";
import { speedLimiter } from "./utils/speedLimiter";
import { rateLimiter } from "./utils/rateLimiter";

const app: Express = express();

app.set("trust proxy", 1);
app.use(rateLimiter);
app.use(speedLimiter);

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use("/api/v1", router);

app.all("/health", (_req, res) => {
	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Server is running",
	});
});

app.all("*", (_req, res) => {
	res.status(404).json({
		success: false,
		statusCode: 404,
		message: "Not Found",
	});
});

app.use(globalErrorHandler);

export default app;

import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

app.all("/health", (req, res) => {
	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Server is running",
	})
})

app.all("*", (req, res) => {
	res.status(404).json({
		success: false,
		statusCode: 404,
		message: "Not Found",
	});
});

app.use(globalErrorHandler);

export default app;

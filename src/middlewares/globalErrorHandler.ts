import {ErrorRequestHandler} from "express"

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const error = {
		success: false,
		statusCode: err.statusCode ?? 500,
		message: err.message ?? "Something went wrong",
		errorMessage: err.errorMessages ?? [],
		stack: err.stack ?? "",
	}
	
	res.status(err.statusCode).json(error);
	next();
}

export default globalErrorHandler;

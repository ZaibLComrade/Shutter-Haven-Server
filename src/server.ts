import app from "./app";
import connectDb from "./lib/connectDb";
import { config } from "./config";
import { Server } from "http";

let server: Server;

const main = () => {
	try {
		server = app.listen(config.port, async () => {
			console.log(`Server is running on port ${config.port}`);
			await connectDb();
		});
	} catch (err) {
		console.error(err);
	}
};
main();

process.on("uncaughtException", () => {
	console.log("Uncaught exception detected. Shutting down server...");
	process.exit(1);
});

process.on("unhandledRejection", () => {
	console.log("Unhandled rejection detected. Shutting down server...");
	if (server) {
		server.close(() => {
			process.exit(1);
		});
	}
});

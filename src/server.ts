import app from "./app";
import { connect } from "mongoose";
import { config } from "./config";
import { Server } from "http";

let server: Server;

const main = async () => {
	try {
		await connect(config.compass_uri, { dbName: "shutterHaven" });
		console.info("==== Connected to MongoDB ====");
		server = app.listen(config.port, async () => {
			console.log(`Server is running on port ${config.port}`);
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

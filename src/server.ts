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

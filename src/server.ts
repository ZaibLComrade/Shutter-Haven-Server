import app from "./app";
import { config } from "./config";
import { Server } from "http";

let server: Server;

const main = () => {
	try {
		server = app.listen(config.port, () => {
			console.log(`Server is running on port ${config.port}`)
		})
	} catch(err) {
		console.error(err);
	}
}
main();

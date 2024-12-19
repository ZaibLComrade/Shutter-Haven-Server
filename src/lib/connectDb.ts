import { connect } from "mongoose";
import { config } from "../config";

const connectDb = async() => {
	try {
		console.log("Initiating database connection...")
		await connect(config.db_uri, { dbName: "shutterHaven" })
		console.log("=== Connected to MongoDB ===");
	} catch(err) {
		console.error(err);
	}
}

export default connectDb;

import { connect } from "mongoose";
import { config } from "../config";

const connectDb = async() => {
	try {
		console.log("Initiating database connection...")
		console.log(config.db_uri)
		await connect(config.db_uri)
		console.log("=== Connected to MongoDB ===");
	} catch(err) {
		console.error(err);
	}
}

export default connectDb;

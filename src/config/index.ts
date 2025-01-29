import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const inDevMode = !!(process.env.NODE_ENV === "development");

export const config = {
	inDevMode,
	port: process.env.PORT ?? 5000,
	db_uri: process.env.DB_URI as string,
	jwt_secret: process.env.JWT_SECRET as string,
	compass_uri: process.env.COMPASS_URI as string,
	hmac_secret: process.env.HMAC_SECRET as string,
};

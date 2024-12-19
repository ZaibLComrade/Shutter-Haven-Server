import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") })

interface Config {
	port: string | number;
}

const inDevMode = !!(process.env.NODE_ENV === "development")

export const config: Config = {
	port: process.env.PORT ?? 5000,
}

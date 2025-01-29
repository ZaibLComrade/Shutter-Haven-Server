import crypto from "crypto";
import {config} from "../config";

const secret_key = config.hmac_secret; 

/**
 * Generate an HMAC signature
 * @param clientId - The unique client ID
 * @param timestamp - The current timestamp in ISO format
 * @param secret - The shared secret key
 * @returns The generated HMAC signature
 */
const generateHmac = (
	clientId: string,
	timestamp: string,
	secret: string = secret_key
) => {
	const data = `${clientId}:${timestamp}`;
	const hash = crypto.createHmac("sha256", secret).update(data).digest("hex");
	return hash;
};

export default generateHmac;

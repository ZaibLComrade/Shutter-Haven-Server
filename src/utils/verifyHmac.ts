import crypto from "crypto";
import generateHmac from "./generateHmac";
import {config} from "../config";

const hmac_secret = config.hmac_secret; 

/**
 * Verify the HMAC signature
 * @param clinetId - The unique clinet Id
 * @param timestamp - The timestamp sent with the request
 * @param providedHmac - The HMAC signature provided by the client
 * @param secret - The shared secret key
 * @returns True if valid, false otherwise
 */
const verifyHmac = (
	clientId: string,
	timestamp: string,
	providedHmac: string,
	secret: string = hmac_secret
): boolean => {
	const currentTimestamp = Date.now();
	const requestTimestamp = new Date(timestamp).getTime();
	if(Math.abs(currentTimestamp - requestTimestamp) > (5 * 60 * 1000)) {
		return false;
	}
	
	const expectedHmac = generateHmac(clientId, timestamp, secret);
	return crypto.timingSafeEqual(Buffer.from(expectedHmac), Buffer.from(providedHmac))
};

export default verifyHmac;

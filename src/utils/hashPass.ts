import { createHmac } from "crypto";

/**
 * Hash a password with salt using MD5 or SHA-256.
 *
 * @param password The password to hash.
 * @param salt The salt to apply to the password.
 * @param algorithm The hashing algorithm, 'md5' or 'sha256'.
 * @returns The hashed password.
 */
function hashPass(
	password: string,
	salt: string,
	algorithm: "md5" | "sha256" = "md5"
): string {
	if (!password || !salt || !algorithm) {
		throw new Error("Password, salt, and algorithm are required.");
	}

	const hmac = createHmac(algorithm, salt); // Create HMAC with chosen algorithm and salt
	hmac.update(password); // Update HMAC with password
	return hmac.digest("hex"); // Return the hashed password in hexadecimal format
}

/**
 * Example usage:
 *
 * const salt = 'random_salt_string'; // This should be securely stored, e.g., in the database
 * const password = 'user_password';
 * const hashedPassword = hashPassword(password, salt, 'sha256');
 * console.log(hashedPassword);
 */

export default hashPass;

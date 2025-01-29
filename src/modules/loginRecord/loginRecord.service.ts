import RecordLogin from "./loginRecord.model";

// Log login attempt (successful or failed)
export const logLoginAttempt = async (
	userId: string,
	success: boolean,
	ipAddress: string,
	deviceType: string,
	userAgent: string,
	clientId: string,
	errorMessage?: string
) => {
	try {
		const loginRecord = new RecordLogin({
			user: userId,
			success,
			loginTime: new Date(),
			ipAddress,
			deviceType,
			userAgent,
			clientId,
			errorMessage,
		});

		const savedRecord = await loginRecord.save();
		console.log("Login attempt logged");
		return savedRecord;
	} catch (error) {
		console.error("Error logging login attempt:", error);
		throw new Error("Error logging login attempt");
	}
};

// Log session end and calculate session duration
export const logSessionEnd = async (recordId: string) => {
	try {
		const record = await RecordLogin.findById(recordId);
		if (!record) {
			throw new Error("Login record not found");
		}

		// Set the session end time and calculate session duration
		record.sessionEnd = new Date();
		record.sessionDuration = Math.floor(
			(record.sessionEnd.getTime() - record.sessionStart!.getTime()) /
				1000 // Duration in seconds
		);

		await record.save(); // Save the updated record
		console.log("Session ended and duration logged");
		return record;
	} catch (error) {
		console.error("Error logging session end:", error);
		throw new Error("Error logging session end");
	}
};

// Log when the app is opened (client access)
export const logAppAccess = async (
	clientId: string,
	ipAddress: string,
	deviceType: string,
	userAgent: string
) => {
	try {
		const accessRecord = new RecordLogin({
			success: null, // No success status for access logging
			loginTime: new Date(),
			ipAddress,
			deviceType,
			userAgent,
			clientId,
		});

		const savedRecord = await accessRecord.save();
		console.log("App access logged");
		return savedRecord;
	} catch (error) {
		console.error("Error logging app access:", error);
		throw new Error("Error logging app access");
	}
};

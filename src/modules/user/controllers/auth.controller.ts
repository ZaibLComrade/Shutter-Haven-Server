import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { registerUser, getUserByEmail } from "../user.service";
import catchAsync from "../../../utils/catchAsync";
import ApiError from "../../../utils/ApiError";
import { config } from "../../../config";

export const register = catchAsync(async (req: Request, res: Response) => {
	const { name, email, password, role } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await registerUser({
		name,
		email,
		password: hashedPassword,
		role,
		cart: [],
	});
	user.password = "";

	const token = jwt.sign(
		{ id: user?.id, role: user?.role },
		config.jwt_secret,
		{
			expiresIn: "1h",
		}
	);

	res.cookie("auth-token", token, {
		secure: !config.inDevMode,
		httpOnly: true,
	});

	if (!user) throw new ApiError(400, "Couldn't create user");
	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Successfully created user",
		data: user,
	});
});

export const login = catchAsync(async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await getUserByEmail(email);

	if (!user || !(await bcrypt.compare(password, user.password))) {
		res.status(400).json({ message: "Invalid email or password" });
	}

	user!.password = "";

	const token = jwt.sign(
		{ id: user?.id, role: user?.role },
		config.jwt_secret,
		{
			expiresIn: "1h",
		}
	);

	res.cookie("auth-token", token, {
		secure: !config.inDevMode,
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "User logged in successfully",
		token,
		data: user,
	});
});

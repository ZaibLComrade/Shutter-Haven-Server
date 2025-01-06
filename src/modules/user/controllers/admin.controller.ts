import { Request, Response } from "express";
import { updateUserRole, deleteUser, getAllUsers } from "../user.service";
import catchAsync from "../../../utils/catchAsync";
import ApiError from "../../../utils/ApiError";

export const getUsers = catchAsync(async (_req: Request, res: Response) => {
	const users = await getAllUsers();
	if (!users || users.length < 1) throw new ApiError(404, "Users not found");
	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Retreived users successfully",
		data: users,
	});
});

export const changeUserRole = catchAsync(
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const { role } = req.body;
		const user = await updateUserRole(id, role);
		user!.password = "";
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Updated user successfully",
			data: user,
		});
	}
);

export const removeUser = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	await deleteUser(id);
	res.status(204).json({
		success: true,
		statusCode: 204,
		message: "Successfully deleted user",
	});
});

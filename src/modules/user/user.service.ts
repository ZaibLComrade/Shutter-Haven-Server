import User from "./user.model";
import { IUser } from "./user.interface";
import hashPass from "../../utils/hashPass";

export const registerUser = async (userData: IUser) => {
	const hashedPassword = hashPass(userData.password, "", "sha256");

	const user = new User({
		...userData,
		password: hashedPassword,
	});
	return await user.save();
};

export const getUserByEmail = async (email: string) => {
	return await User.findOne({ email });
};

export const updateUserRole = async (id: string, role: string) => {
	return await User.findByIdAndUpdate(id, { role }, { new: true });
};

export const deleteUser = async (id: string) => {
	return await User.findByIdAndDelete(id);
};

export const getAllUsers = async () => {
	return await User.find();
};

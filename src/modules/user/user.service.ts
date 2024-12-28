import User from "./user.model";
import { IUser } from "./user.interface";

export const registerUser = async (userData: IUser) => {
	const user = new User(userData);
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

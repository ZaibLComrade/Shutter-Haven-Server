export enum UserRole {
	ADMIN = "admin",
	BUYER = "buyer",
	SELLER = "seller",
}

export interface IUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
}

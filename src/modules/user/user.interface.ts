export enum UserRole {
	ADMIN = "Admin",
	BUYER = "Buyer",
	SELLER = "Seller",
}

export interface ICartItem {
	product: string;
	quantity: number
}

export interface IUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	cart: ICartItem[];
}

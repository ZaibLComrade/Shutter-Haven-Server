export enum UserRole {
	ADMIN = "ADMIN",
	BUYER = "BUYER",
	SELLER = "SELLER",
}

export interface ICartItem {
	product: string;
	quantity: number
}

export interface IUser {
	_id?: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	cart: ICartItem[];
}

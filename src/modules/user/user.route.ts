import express from "express";
import { register, login } from "./controllers/auth.controller";
import {
	changeUserRole,
	getUsers,
	removeUser,
} from "./controllers/admin.controller";
import { verifyRole } from "../../middlewares/verifyRole";
import { verifyUser } from "../../middlewares/verifyUser";
import {userRole} from "../../constants/userRole";

const authRouter = express.Router();
const userRouter = express.Router();

// Auth Routes
authRouter.post("/register", register);
authRouter.post("/login", login);

// Admin Routes
userRouter.get("/", verifyUser, verifyRole([userRole.ADMIN]), getUsers);
userRouter.patch(
	"/update-role/:id",
	verifyUser,
	verifyRole([userRole.ADMIN]),
	changeUserRole
);
userRouter.delete("/:id", verifyUser, verifyRole([userRole.ADMIN]), removeUser);

export { authRouter, userRouter };

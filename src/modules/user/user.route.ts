import express from "express";
import { register, login } from "./controllers/auth.controller";
import {
	changeUserRole,
	getUsers,
	removeUser,
} from "./controllers/admin.controller";
import { verifyRole } from "../../middlewares/verifyRole";
import { verifyUser } from "../../middlewares/verifyUser";

const userRouter = express.Router();

// Auth Routes
userRouter.post("/register", register);
userRouter.post("/login", login);

// Admin Routes
userRouter.get("/", verifyUser, verifyRole(["admin"]), getUsers);
userRouter.patch(
	"/update-role",
	verifyUser,
	verifyRole(["admin"]),
	changeUserRole
);
userRouter.delete("/:id", verifyUser, verifyRole(["admin"]), removeUser);

export default userRouter;

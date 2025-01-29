import express from "express";
import {appOpen} from "./loginRecord.controller";

const loginRecordRouter = express.Router();

loginRecordRouter.post("/app-open", appOpen);


export default loginRecordRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
const inDevMode = !!(process.env.NODE_ENV === "development");
exports.config = {
    inDevMode,
    port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000,
    db_uri: process.env.DB_URI,
    jwt_secret: process.env.JWT_SECRET,
    compass_uri: process.env.COMPASS_URI,
};

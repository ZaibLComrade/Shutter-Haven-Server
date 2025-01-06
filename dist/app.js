"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
const speedLimiter_1 = require("./utils/speedLimiter");
const rateLimiter_1 = require("./utils/rateLimiter");
const app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use(rateLimiter_1.rateLimiter);
app.use(speedLimiter_1.speedLimiter);
app.use((0, cors_1.default)({
    origin: ["*"],
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10kb" }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", routes_1.default);
app.all("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Server is running",
    });
});
app.all("*", (_req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;

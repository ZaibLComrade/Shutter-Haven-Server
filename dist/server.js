"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connectDb_1 = __importDefault(require("./lib/connectDb"));
const config_1 = require("./config");
let server;
const main = () => {
    try {
        server = app_1.default.listen(config_1.config.port, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Server is running on port ${config_1.config.port}`);
            yield (0, connectDb_1.default)();
        }));
    }
    catch (err) {
        console.error(err);
    }
};
main();
process.on("uncaughtException", () => {
    console.log("Uncaught exception detected. Shutting down server...");
    process.exit(1);
});
process.on("unhandledRejection", () => {
    console.log("Unhandled rejection detected. Shutting down server...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
let server;
const main = () => {
    try {
        server = app_1.default.listen(config_1.config.port, () => {
            console.log(`Server is running on port ${config_1.config.port}`);
        });
    }
    catch (err) {
        console.error(err);
    }
};
main();

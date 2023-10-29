"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./src/utils/config"));
const port = config_1.default.PORT || 3001;
// Workers can share any TCP connection
// In this case it is an HTTP server
const server = http_1.default.createServer(app_1.default);
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

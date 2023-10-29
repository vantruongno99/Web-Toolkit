"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const middleware_1 = __importDefault(require("./src/utils/middleware"));
const compression = require('compression');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use(compression());
(0, morgan_body_1.default)(app);
app.use(express_1.default.static('dist'));
app.get('/api', (req, res) => {
    res.json({ status: 'API is running on /api' });
});
app.use(routes_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;

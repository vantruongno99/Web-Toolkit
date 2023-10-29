"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = __importDefault(require("../controllers/application.controller"));
const technolofy_controller_1 = __importDefault(require("../controllers/technolofy.controller"));
const vendor_controller_1 = __importDefault(require("../controllers/vendor.controller"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const routes = (0, express_1.Router)();
routes.use('/api/app', application_controller_1.default);
routes.use('/api/tech', technolofy_controller_1.default);
routes.use('/api/vendor', vendor_controller_1.default);
routes.use('/api/admin', admin_controller_1.default);
exports.default = routes;

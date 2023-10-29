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
const express_1 = require("express");
const admin_service_1 = __importDefault(require("../services/admin.service"));
require('express-async-errors');
const adminRoute = (0, express_1.Router)();
adminRoute.put('/approve/:vendorId/:applicationId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = Number(req.params.applicationId);
    const vendorId = Number(req.params.vendorId);
    yield admin_service_1.default.approve(vendorId, applicationId);
    res.status(200).end();
}));
adminRoute.put('/disapprove/:vendorId/:applicationId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = Number(req.params.applicationId);
    const vendorId = Number(req.params.vendorId);
    yield admin_service_1.default.disapprove(vendorId, applicationId);
    res.status(200).end();
}));
adminRoute.get('/approve', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield admin_service_1.default.getAll();
    res.status(200).json(data);
}));
exports.default = adminRoute;

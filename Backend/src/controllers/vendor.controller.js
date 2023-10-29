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
const vendor_service_1 = __importDefault(require("../services/vendor.service"));
require('express-async-errors');
const vendorRoute = (0, express_1.Router)();
vendorRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sensors = yield vendor_service_1.default.addVendor(req.body);
    res.status(200).json(sensors);
}));
vendorRoute.post('/:vendorId/apply/:applicationId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = Number(req.params.applicationId);
    const vendorId = Number(req.params.vendorId);
    const sensors = yield vendor_service_1.default.assignVendor(applicationId, vendorId, req.body);
    res.status(200).json(sensors);
}));
vendorRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sensors = yield vendor_service_1.default.getAllVendor();
    res.status(200).json(sensors);
}));
vendorRoute.get('/:id/application', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const sensors = yield vendor_service_1.default.getApplicationByVendorId(id);
    res.status(200).json(sensors);
}));
vendorRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const sensors = yield vendor_service_1.default.getVendorById(id);
    res.status(200).json(sensors);
}));
vendorRoute.get('/ABN/:ABN', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ABN = Number(req.params.ABN);
    const sensors = yield vendor_service_1.default.getVendorByABN(ABN);
    res.status(200).json(sensors);
}));
exports.default = vendorRoute;

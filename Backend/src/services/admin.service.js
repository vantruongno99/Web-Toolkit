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
const prismaClient_1 = require("../../prisma/prismaClient");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const approve = (vendorId, applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.prisma.applicationVendor.update({
            where: {
                vendorId_applicationId: {
                    vendorId,
                    applicationId
                }
            },
            data: {
                approved: "APPROVED"
            }
        });
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const disapprove = (vendorId, applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.prisma.applicationVendor.update({
            where: {
                vendorId_applicationId: {
                    vendorId,
                    applicationId
                }
            },
            data: {
                approved: "DISAPPROVED"
            }
        });
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prismaClient_1.prisma.applicationVendor.findMany({
            include: {
                Vendor: true,
                Application: true
            }
        });
        return data;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
exports.default = {
    approve,
    getAll,
    disapprove
};

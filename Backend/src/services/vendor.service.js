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
const getAllVendor = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const technologies = yield prismaClient_1.prisma.vendor.findMany({
            include: {
                Application: {
                    select: {
                        Application: true
                    }
                }
            }
        });
        return technologies;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const getVendorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield prismaClient_1.prisma.vendor.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                Application: {
                    select: {
                        Application: true
                    }
                }
            }
        });
        return vendor;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const getVendorByABN = (ABN) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield prismaClient_1.prisma.vendor.findFirstOrThrow({
            where: {
                ABN: ABN
            },
            include: {
                Application: {
                    select: {
                        Application: true
                    }
                }
            }
        });
        return vendor;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const addVendor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVendor = yield prismaClient_1.prisma.vendor.create({
            data: data
        });
        return newVendor;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const assignVendor = (applicationId, vendorId, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const VendorApplication = yield prismaClient_1.prisma.applicationVendor.create({
            data: {
                vendorId,
                applicationId,
                showcase: input.showcase
            }
        });
        return VendorApplication;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const getApplicationByVendorId = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const VendorApplication = yield prismaClient_1.prisma.applicationVendor.findMany({
            where: {
                vendorId
            },
            include: {
                Vendor: true,
                Application: true
            }
        });
        return VendorApplication;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
exports.default = {
    getAllVendor,
    getVendorById,
    addVendor,
    assignVendor,
    getApplicationByVendorId,
    getVendorByABN
};

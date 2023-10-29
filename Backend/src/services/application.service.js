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
const getAllApplication = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield prismaClient_1.prisma.application.findMany({
            include: {
                Vendor: {
                    select: {
                        Vendor: true
                    }
                }
            }
        });
        return applications;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const getApplicationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield prismaClient_1.prisma.application.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                Vendor: {
                    include: {
                        Vendor: true
                    }
                }
            }
        });
        return applications;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const addApplication = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppliction = yield prismaClient_1.prisma.application.create({
            data: data
        });
        return newAppliction;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const deleteApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.prisma.application.delete({
            where: {
                id: id
            },
        });
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const editApplication = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppliction = yield prismaClient_1.prisma.application.update({
            where: {
                id
            },
            data: data
        });
        return newAppliction;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
exports.default = {
    getAllApplication,
    getApplicationById,
    addApplication,
    deleteApplication,
    editApplication
};

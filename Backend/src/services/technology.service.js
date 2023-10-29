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
const getAllTechnology = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const technologies = yield prismaClient_1.prisma.technology.findMany({
            include: {
                Application: true
            }
        });
        return technologies;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const getTechnology = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const technology = yield prismaClient_1.prisma.technology.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                Application: true
            }
        });
        return technology;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const addTechnology = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTechnology = yield prismaClient_1.prisma.technology.create({
            data: data
        });
        return newTechnology;
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const deleteTechnology = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.prisma.technology.delete({
            where: {
                id: id
            },
        });
    }
    catch (e) {
        (0, errorHandler_1.default)(e);
    }
});
const editTechnology = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppliction = yield prismaClient_1.prisma.technology.update({
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
    getAllTechnology,
    getTechnology,
    addTechnology,
    deleteTechnology,
    editTechnology
};

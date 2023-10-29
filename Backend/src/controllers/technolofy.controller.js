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
const technology_service_1 = __importDefault(require("../services/technology.service"));
require('express-async-errors');
const techRouter = (0, express_1.Router)();
techRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sensors = yield technology_service_1.default.addTechnology(req.body);
    res.status(200).json(sensors);
}));
techRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sensors = yield technology_service_1.default.getAllTechnology();
    res.status(200).json(sensors);
}));
techRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    console.log(id);
    const sensors = yield technology_service_1.default.getTechnology(id);
    res.status(200).json(sensors);
}));
techRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    yield technology_service_1.default.deleteTechnology(id);
    res.status(204).end();
}));
techRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const data = req.body;
    const sensor = yield technology_service_1.default.editTechnology(data, id);
    res.status(200).json(sensor);
}));
exports.default = techRouter;

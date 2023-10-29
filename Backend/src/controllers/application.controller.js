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
const application_service_1 = __importDefault(require("../services/application.service"));
require('express-async-errors');
const techRouter = (0, express_1.Router)();
techRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sensors = yield application_service_1.default.addApplication(req.body);
    res.status(200).json(sensors);
}));
techRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sensors = yield application_service_1.default.getAllApplication();
    res.status(200).json(sensors);
}));
techRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    console.log("trigger");
    const technology = yield application_service_1.default.getApplicationById(id);
    res.status(200).json(technology);
}));
techRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    yield application_service_1.default.deleteApplication(id);
    res.status(204).end();
}));
techRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const data = req.body;
    const sensor = yield application_service_1.default.editApplication(data, id);
    res.status(200).json(sensor);
}));
exports.default = techRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MqttHandler_1 = __importDefault(require("./MqttHandler"));
const mqttClient = new MqttHandler_1.default();
exports.default = mqttClient;

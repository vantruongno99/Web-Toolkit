"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { PORT } = process.env;
const JWT_SCERET = process.env.SECRET;
const MQTT = process.env.MQTT || "mqtt://localhost";
const REDIS = process.env.REDIS;
exports.default = {
    PORT, JWT_SCERET, MQTT, REDIS
};

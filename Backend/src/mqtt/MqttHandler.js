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
const mqtt_1 = __importDefault(require("mqtt"));
const config_1 = __importDefault(require("../utils/config"));
class MqttHandler {
    constructor() {
        this.mqttClient = mqtt_1.default.connect({
            host: config_1.default.MQTT,
            port: 1883,
            protocol: "mqtt",
            clean: false,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            // port: 8883,
            //protocol :"mqtts",
            // keepalive: 10,
            // ca: fs.readFileSync('certs/ca.crt'),
            // cert: fs.readFileSync('certs/server.crt'),
            // key: fs.readFileSync('certs/server.key'),
            // rejectUnauthorized: false,
        });
        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });
        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });
        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }
    // Sends a mqtt message to topic: mytopic
    sendMessage(message, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.mqttClient.publish(topic, message, { qos: 1, retain: true }, (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mqttClient.end();
        });
    }
    expectMessage(topicT, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const toTopic = `ToServer/${topicT.split('/')[1]}`;
            const wait = () => {
                return new Promise((_, reject) => {
                    setTimeout(() => {
                        this.mqttClient.unsubscribe(toTopic, function (err) {
                            console.log("unsubcribe");
                        });
                        reject(new Error('timeout succeeded'));
                    }, 5000);
                });
            };
            const expect = () => new Promise((resolve, reject) => {
                this.mqttClient.subscribe(toTopic, function (err) {
                    console.log("subcribe");
                });
                this.mqttClient.on('message', (topic, message) => {
                    const output = message.toString();
                    if (toTopic === topic.toString() && output.split(',')[0] === type) {
                        this.mqttClient.unsubscribe(toTopic, function (err) {
                            console.log("unsubcribe");
                        });
                        return resolve(output);
                    }
                });
            });
            return yield Promise.race([wait(), expect()]);
        });
    }
    sendAndExpect(message, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = message.split(',')[0];
                let [someResult, anotherResult] = yield Promise.all([this.expectMessage(topic, type), yield this.sendMessage(message, topic)]);
                return someResult;
            }
            catch (err) {
                throw new Error('no response');
            }
        });
    }
}
exports.default = MqttHandler;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnectionServices_1 = require("./services/dbConnectionServices");
const app = (0, express_1.default)();
const port = 3400;
app.use((req, res) => {
    res.send({ "hello": "greetings" });
});
(0, dbConnectionServices_1.dbConnectService)();
app.listen(port, () => {
    console.log("I am runnning on this port ------------", port);
});

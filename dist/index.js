"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3400;
app.use((req, res) => {
    res.send({ "hello": "greetings" });
});
app.listen(port, () => {
    console.log("I am runnning on this port ------------", port);
});

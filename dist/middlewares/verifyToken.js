"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// import { NextFunction,Request, Response } from 'express';
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { Employee } from '../interfaces/employee';
// export interface IExtendedUserRequest extends Request{
//     info?:IdecodedData
// }
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(404).json({
                message: "You do not have access"
            });
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.info = data;
    }
    catch (error) {
        return res.json({
            message: error
        });
    }
    next();
};
exports.verifyToken = verifyToken;

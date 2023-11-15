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
exports.getAllTours = exports.createNewTour = void 0;
const dbConnectionHelper_1 = __importDefault(require("../helpers/dbConnectionHelper"));
const uuid_1 = require("uuid");
const db = dbConnectionHelper_1.default.getInstance();
const createNewTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        let { title, tourType, destination, price, availableDate, image } = req.body;
        availableDate = new Date();
        availableDate = availableDate.toJSON();
        let data = { id, title, tourType, destination, price, availableDate, image };
        yield db.exec('createNewTour', data);
        return res.status(201).json({ message: `Tour created has been registered successfully. The ID is ${id}` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in creating tour ", error: error.message });
    }
});
exports.createNewTour = createNewTour;
const getAllTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tours = (yield db.exec('getAllTours')).recordset;
        if (!tours) {
            return res.status(404).json("no events found");
        }
        console.log("data fetched form the db about tours", tours);
        return res.status(200).json(tours);
    }
    catch (error) {
        return res.status(500).json({ message: "error in fetching events record", error: error.message });
    }
});
exports.getAllTours = getAllTours;

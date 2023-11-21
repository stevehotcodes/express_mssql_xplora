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
exports.updateTourDetails = exports.getTourById = exports.getTourBySearch = exports.getToursByUser = exports.updateTourToBooked = exports.deleteTour = exports.getAllTours = exports.createNewTour = void 0;
const dbConnectionHelper_1 = __importDefault(require("../helpers/dbConnectionHelper"));
const uuid_1 = require("uuid");
const db = dbConnectionHelper_1.default.getInstance();
const createNewTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        let { title, tourType, destination, price, availableDate, image, duration, slots } = req.body;
        availableDate = new Date();
        availableDate = availableDate.toJSON();
        let data = { id, title, tourType, destination, price, availableDate, image, duration, slots };
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
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        yield db.exec('deleteEvent', { id });
        console.log("delete successfully");
        return res.status(201).json({ message: "tour successfully deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteTour = deleteTour;
const updateTourToBooked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let userID=req.info?.id! as string
        let { id, userID } = req.params;
        let result = yield db.exec("updateTourToBooked", { id, userID });
        console.log("userId", userID);
        return res.status(200).json({ message: "tour booked successfully", result });
    }
    catch (error) {
        return res.status(500).json({ message: "booking unsuccessful", error });
    }
});
exports.updateTourToBooked = updateTourToBooked;
const getToursByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userID } = req.params;
        let events = (yield db.exec('getBookedToursByUser', { userID })).recordset;
        // console.log(events)
        if (!events) {
            return res.status(404).json({ message: "no events found by the user" });
        }
        return res.status(200).json(events);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in fetching tours of the user", error });
    }
});
exports.getToursByUser = getToursByUser;
const getTourBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { tourType } = req.params;
        let events = (yield db.exec('getTourTypesBy', { tourType })).recordset;
        console.log(events);
        if (!events) {
            return res.status(404).json({ message: "no events found" });
        }
        return res.status(200).json(events);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in searching tours" });
    }
});
exports.getTourBySearch = getTourBySearch;
const getTourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let event = yield (yield db.exec('getTourById', { id })).recordset;
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        console.log("get tour by id results", event);
        return res.status(200).json(event);
    }
    catch (error) {
        return res.status(500).json({ message: "error in fetching event", error });
    }
});
exports.getTourById = getTourById;
const updateTourDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        // const existingEvent=await getTourByIdHelper(id)
        //  console.log("this is existing event",existingEvent);
        //  if(!existingEvent){return res.status(404).json({message:"event not found"})}
        let { title, tourType, destination, price, availableDate, image, slots, duration } = req.body;
        let result = yield db.exec('updateTourDetails', { id, title, tourType, destination, price, availableDate, image, slots, duration });
        console.log(result);
        return res.status(200).json({ message: `event with the ${id} updated successfully` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.updateTourDetails = updateTourDetails;
const getTourByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (yield db.exec('getUserById', { id })).recordset[0];
        return event;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
//  @id VARCHAR(255),
//  @title VARCHAR(255),
//  @tourType VARCHAR (255) ,
//  @destination VARCHAR(255), 
//  @price VARCHAR (255),
//  @availableDate VARCHAR (255),
//  @image VARCHAR (255),
//  @slots VARCHAR (255),
//  @duration VARCHAR(255)

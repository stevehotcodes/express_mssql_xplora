"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toursControllers_1 = require("../controllers/toursControllers");
const toursRoutes = (0, express_1.Router)();
toursRoutes.post('/create', toursControllers_1.createNewTour);
toursRoutes.get('/all', toursControllers_1.getAllTours);
exports.default = toursRoutes;

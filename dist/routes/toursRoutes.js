"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toursControllers_1 = require("../controllers/toursControllers");
const toursRoutes = (0, express_1.Router)();
toursRoutes.get('/all', toursControllers_1.getAllTours);
toursRoutes.post('/create', toursControllers_1.createNewTour);
toursRoutes.delete('/tours/:id', toursControllers_1.deleteTour);
exports.default = toursRoutes;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/signup', userControllers_1.registerNewUser);
userRoutes.post('/signin', userControllers_1.loginUser);
exports.default = userRoutes;

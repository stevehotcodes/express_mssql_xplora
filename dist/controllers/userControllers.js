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
exports.updateUser = exports.checkUserDetails = exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.loginUser = exports.registerNewUser = void 0;
const dbConnectionHelper_1 = __importDefault(require("../helpers/dbConnectionHelper"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnection = dbConnectionHelper_1.default.getInstance();
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        let { fullName, email, password } = req.body;
        // const{error}=registrationSchema.validate(req.body);
        // if(error){
        //     return res.status(406).json({error:error.details[0].message})
        // }
        password = yield bcrypt_1.default.hash(password, 10);
        yield dbConnection.exec('createNewUser', { id, fullName, email, password });
        return res.status(201).json({ message: `User <${email}> has been registered successfully. Your ID is ${id}` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ messsage: error.message });
    }
});
exports.registerNewUser = registerNewUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        //fetch the deatils of the user 
        let user = (yield dbConnection.exec('getUserByEmail', { email })).recordset[0];
        if (!user) {
            return res.status(404).json({ message: "user does not exist please signup" });
        }
        if (user.email == email) {
            const passwordDb = yield bcrypt_1.default.compare(password, user.password);
            console.log(passwordDb, user.email, password, user.password);
            if (!passwordDb) {
                return res.status(401).json("Incorrect credential for the user");
            }
            const userPayload = { 'id': user.id, 'fullname': user.fullName, 'email': user.email, 'role': user.role };
            const token = jsonwebtoken_1.default.sign(userPayload, process.env.SECRET, {
                expiresIn: '36000s'
            });
            return res.status(200).json({
                message: "Logged in successfully", token,
                role: user.role,
                id: user.id
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let result = yield dbConnection.exec('deleteUser', { id });
        return res.status(201).json({ message: "deleted successfully", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = (yield dbConnection.exec('getAllUsers')).recordset;
        if (!users) {
            return res.status(404).json({ message: "users not found" });
        }
        ;
        console.log(users);
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: "error in fetching users", error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let user = yield (yield dbConnection.exec('getUserById', { id })).recordset;
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "no user found with the id " });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info
        });
    }
});
exports.checkUserDetails = checkUserDetails;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        console.log("params id", id);
        const existingUser = yield getUserByIdHelper(id);
        console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({ message: "No user found with the id" });
        }
        let { email, password } = req.body;
        password = yield bcrypt_1.default.hash(password, 10);
        console.log("hey i am an upodate controller");
        let result = yield dbConnection.exec('updateUser', { id, email, password });
        console.log(result);
        return res.status(200).json({ message: "user updated successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in updating the user" });
    }
});
exports.updateUser = updateUser;
const getUserByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (yield dbConnection.exec('getUserById', { id })).recordset[0];
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});

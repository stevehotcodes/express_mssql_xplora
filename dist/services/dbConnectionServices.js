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
exports.dbConnectService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dbConfig_1 = require("../config/dbConfig");
// export const dbConnectionService =async()=>{
//     try{
//         let pool=await mssql.connect(dbConfig);
//         if(pool.connected){
//             console.log("db is connected ")
//         }
//         return pool
//     }
//     catch(error){
//         console.log("Error in Database connection ",error)
//     }
// }
function dbConnectService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pool = yield mssql_1.default.connect(dbConfig_1.dbConfig);
            console.log("database connected successfully");
            return pool;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.dbConnectService = dbConnectService;

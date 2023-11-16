import dotenv from 'dotenv'
// import { NextFunction,Request, Response } from 'express';
dotenv.config();
import { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { IExtendedUserRequest, IdecodedData } from '../types/interfaces';
// import { Employee } from '../interfaces/employee';
// export interface IExtendedUserRequest extends Request{
//     info?:IdecodedData
// }


export const verifyToken = (req:IExtendedUserRequest, res:Response, next:NextFunction) =>{
    try {
        const token = req.headers['token'] as string;


        if(!token){
            return res.status(404).json({
                message: "You do not have access"
            })
        }

        const data = jwt.verify(token, process.env.SECRET as string) as IdecodedData

        req.info = data
        
    } catch (error) {
        return res.json({
            message: error
        })
    }

    next();
}
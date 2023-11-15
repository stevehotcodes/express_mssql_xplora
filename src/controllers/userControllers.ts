import DatabaseHelper from "../helpers/dbConnectionHelper";
import { Request,Response } from "express";
import {v4 as uid} from 'uuid'
import { registrationSchema } from "../helpers/validators";
import bcrypt from 'bcrypt'

const dbConnection=DatabaseHelper.getInstance();

export const registerNewUser=async(req:Request,res:Response)=>{
    try {
        let id =uid()
        let {fullName,email,password}=req.body
        // const{error}=registrationSchema.validate(req.body);
        
        // if(error){
        //     return res.status(406).json({error:error.details[0].message})
        // }
        password=await bcrypt.hash(password,10);
        
        await dbConnection.exec('createNewUser',{id,fullName,email,password})
        return res.status(201).json({message:`User <${email}> has been registered successfully. Your ID is ${id}`})

        
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({messsage:error.message})

    }

}



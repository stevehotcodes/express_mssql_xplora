import DatabaseHelper from "../helpers/dbConnectionHelper";
import { Request,Response } from "express";
import {v4 as uid} from 'uuid'
import { registrationSchema } from "../helpers/validators";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const dbConnection=DatabaseHelper.getInstance();


export interface IUserLoginDetails{
    email:string
    password:string
}
export interface IUser{
    id:string
    fullName:string
    email:string
    password:string
    dateJoined:string
    role: 'user'|'admin'
    isDeleted:number
    
}

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

export const loginUser =async (req:Request,res:Response)=>{
    try {

        let {email,password}=req.body;
        
        //fetch the deatils of the user 
        let user:IUser=(await dbConnection.exec('getUserByEmail',{email})).recordset[0];
        if(!user){
            return  res.status(404).json({message:"user does not exist please signup"});
        }
        if(user.email==email){
            const passwordDb=await bcrypt.compare(password as string,user.password as string)
            console.log(passwordDb,user.email,password,user.password)
            if(!passwordDb){
                return res.status(401).json("Incorrect credential for the user")
            }

            const userPayload= {'id': user.id, 'fullname':user.fullName, 'email':user.email, 'role':user.role} 
           
            const token = jwt.sign(userPayload, process.env.SECRET as string, {
                expiresIn: '36000s'
            })
            return res.status(200).json({
                message: "Logged in successfully", token,
                role:user.role
            })
         }
       
                
    } catch (error:any) {
        return res.status(500).json({error:error.message})

    }
}

export const deleteUser =async (req:Request,res:Response)=>{
    try {
        
        let {id}=req.params
        let result=await dbConnection.exec('deleteUser',{id});
        return res.status(201).json({message:"deleted successfully",result})
        
    } catch (error:any) {
        return res.status(500).json({message:error.message})
        
    }
}

export const getAllUsers=async (req:Request,res:Response) => {
    try {
        
         let users:IUser[]=(await dbConnection.exec('getAllUsers')).recordset;
         if(!users){return res.status(404).json({message:"users not found"})};
         console.log(users)
         return res.status(200).json(users)
    } catch (error:any) {
        return res.status(500).json({message:"error in fetching users",error:error.message})
    }
    
}
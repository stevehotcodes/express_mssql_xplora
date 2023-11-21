import DatabaseHelper from "../helpers/dbConnectionHelper";
import { Request,Response } from "express";
import {v4 as uid} from 'uuid'
import { registrationSchema } from "../helpers/validators";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IExtendedUserRequest } from "../types/interfaces";
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
                role:user.role,
                id:user.id
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

export const getUserById=async(req:Request,res:Response)=>{
    try {

        let{id}=req.params
    
        let user:IUser[]=await (await dbConnection.exec('getUserById', { id })).recordset;
        console.log(user)
        if(!user){return  res.status(404).json({message:"no user found with the id "})}
        return res.status(200).json(user)
        
    } catch (error:any) {
        
        return res.status(500).json({message:error.message})
        
    }
}
export const checkUserDetails = async (req:IExtendedUserRequest, res:Response)=>{
    
    if(req.info){

        return res.json({
            info: req.info 
        }) 
    }
    
}

export const updateUser =async(req:IExtendedUserRequest,res:Response)=>{
    try {

        let {id}=req.params
        console.log("params id",id)
           const existingUser= await getUserByIdHelper(id);
        console.log(existingUser)
        if (!existingUser) {
            return res.status(404).json({ message: "No user found with the id" });
        }

        let {email,password}=req.body;
        password=await bcrypt.hash(password,10);
        console.log("hey i am an upodate controller")
        let result=await dbConnection.exec('updateUser',{id,email,password});
        console.log(result)

        return res.status(200).json({message:"user updated successfully"})
              
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error in updating the user"})
    }
}

const getUserByIdHelper = async (id: string): Promise<IUser | null> => {
    try {
        const user: IUser = await (await dbConnection.exec('getUserById', { id })).recordset[0];
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export  const reactivateUser=async(req:Request,res:Response)=>{
    try {
        
        
    } catch (error) {
        
    }
}

import { Request,Response } from "express";
import DatabaseHelper from "../helpers/dbConnectionHelper";
import { dbConnectService } from "../services/dbConnectionServices";
import sql from 'mssql'
import {v4 as uuid} from 'uuid'
import { dbConfig } from "../config/dbConfig";


export interface IEvent{
    title:string
    tourType:string
    destination:string
    price:string
    availableDate:string
    image :string
    eventStatus:string
    userID:string
    duration:string
    isDeleted:string

}




const db=DatabaseHelper.getInstance();



export const createNewTour=async(req:Request,res:Response)=>{
    try {
        let id=uuid();
    
        let {title,tourType,destination,price,availableDate,image}=req.body;
        availableDate=new Date()
        availableDate= availableDate.toJSON()
        
        let data={id,title,tourType,destination,price,availableDate,image}

        await db.exec('createNewTour',data);
        return res.status(201).json({message:`Tour created has been registered successfully. The ID is ${id}`})
    } catch (error:any) {
        console.log(error)
        return  res.status(500).json({message:"error in creating tour ", error:error.message})
    
    }
}

export const getAllTours =async(req:Request,res:Response)=>{
    try {

        let tours:IEvent[]=(await db.exec('getAllTours')).recordset
        if(!tours){
            return res.status(404).json("no events found");

        }
        console.log("data fetched form the db about tours",tours)
        return res.status(200).json(tours)
        
    } catch (error:any) {
        return res.status(500).json({message:"error in fetching events record",error:error.message})
        
    }
}

export const deleteTour=async (req:Request,res:Response)=>{
    try {

        let {id}=req.params
        await db.exec('deleteEvent',{id})
        console.log("delete successfully");

        return res.status(201).json({message:"tour successfully deleted"});

        
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }

}
import { Request,Response } from "express";
import DatabaseHelper from "../helpers/dbConnectionHelper";
import { dbConnectService } from "../services/dbConnectionServices";
import sql from 'mssql'
import {v4 as uuid} from 'uuid'
import { dbConfig } from "../config/dbConfig";
import { IExtendedUserRequest } from "../types/interfaces";


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
    
        let {title,tourType,destination,price,availableDate,image,duration}=req.body;
        availableDate=new Date()
        availableDate= availableDate.toJSON()
        
        let data={id,title,tourType,destination,price,availableDate,image,duration}

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

export const updateTourToBooked=async(req:IExtendedUserRequest,res:Response)=>{
    try 
    {
              
        // let userID=req.info?.id! as string
        let{id,userID}=req.params
        let result =await db.exec("updateTourToBooked",{id,userID});
        console.log("userId",userID)
        return res.status(200).json({message:"tour booked successfully",result})

    } 
    catch (error:any) 
    {
        return res.status(500).json({message:"booking unsuccessful",error})
        
    }

}

export const getToursByUser=async(req:Request,res:Response)=>{
    try
     {
        let{userID}=req.params
        let events=(await db.exec('getBookedToursByUser',{userID})).recordset
        // console.log(events)
        if(!events){return res.status(404).json({message:"no events found by the user"})}
        return res.status(200).json(events)
    } 
    catch (error:any) 
    {
        console.log(error)
        return res.status(500).json({message:"error in fetching tours of the user",error})
        
    }
}

export const getTourBySearch=async(req:Request,res:Response)=>{
    try{

    

        let{tourType}=req.params
        let events=(await db.exec('getTourTypesBy',{tourType})).recordset
        console.log(events);
          if(!events){return res.status(404).json({message:"no events found"})}
        return res.status(200).json(events)

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"error in searching tours"})
    }
}


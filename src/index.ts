import express, { Request, Response } from 'express';
import { dbConnectService } from './services/dbConnectionServices';



const app=express();
const port =3400

app.use((req:Request,res:Response)=>{
    res.send({"hello":"greetings"})

})



app.listen(port,()=>{
    console.log("I am runnning on this port ------------",port)
})

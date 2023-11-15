import express, { Request, Response, json } from 'express';
import { dbConnectService } from './services/dbConnectionServices';
import userRoutes from './routes/usersRoutes';
import cors from 'cors';
import toursRoutes from './routes/toursRoutes';



const app=express();
app.use(json())
app.use(cors())
const port =3400

// app.use((req:Request,res:Response)=>{
//     res.send({"hello":"greetings"})

// })

app.use('/users',userRoutes)
app.use('/tours',toursRoutes)



app.listen(port,()=>{
    console.log("I am runnning on this port ------------",port)
})

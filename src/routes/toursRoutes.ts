import { Router } from "express";
import { createNewTour, getAllTours } from "../controllers/toursControllers";



const toursRoutes=Router()

toursRoutes.post('/create',createNewTour);
toursRoutes.get('/all',getAllTours)




export default toursRoutes
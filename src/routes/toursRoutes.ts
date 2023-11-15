import { Router } from "express";
import { createNewTour, deleteTour, getAllTours } from "../controllers/toursControllers";



const toursRoutes=Router()
toursRoutes.get('/all',getAllTours)

toursRoutes.post('/create',createNewTour);

toursRoutes.delete('/tours/:id', deleteTour);





export default toursRoutes
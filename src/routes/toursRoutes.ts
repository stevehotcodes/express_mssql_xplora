import { Router } from "express";
import { createNewTour, deleteTour, getAllTours, getToursByUser, updateTourToBooked } from "../controllers/toursControllers";
import { verifyToken } from "../middlewares/verifyToken";



const toursRoutes=Router()
toursRoutes.get('/all',getAllTours)

toursRoutes.post('/create',createNewTour);
toursRoutes.get('/user/:userID',getToursByUser)
toursRoutes.delete('/tours/:id', deleteTour);
toursRoutes.post("/book/:id/:userID",updateTourToBooked)






export default toursRoutes
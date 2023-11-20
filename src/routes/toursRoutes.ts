import { Router } from "express";
import { createNewTour, deleteTour, getAllTours, getTourBySearch, getToursByUser, updateTourToBooked } from "../controllers/toursControllers";
import { verifyToken } from "../middlewares/verifyToken";



const toursRoutes=Router()
toursRoutes.get('/all',getAllTours)

toursRoutes.post('/create',createNewTour);
toursRoutes.get('/user/:userID',getToursByUser)
toursRoutes.get("/search/:tourType",getTourBySearch)
toursRoutes.delete('/tours/:id', deleteTour);
toursRoutes.post("/book/:id/:userID",updateTourToBooked)
toursRoutes.get("/search/:tourType",getTourBySearch)





export default toursRoutes
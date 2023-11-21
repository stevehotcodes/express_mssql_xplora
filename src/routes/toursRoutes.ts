import { Router } from "express";
import { createNewTour, deleteTour, getAllTours, getTourById, getTourBySearch, getToursByUser, updateTourDetails, updateTourToBooked } from "../controllers/toursControllers";
import { verifyToken } from "../middlewares/verifyToken";



const toursRoutes=Router()
toursRoutes.get('/all',getAllTours)

toursRoutes.post('/create',createNewTour);
toursRoutes.get('/tour/:id',getTourById)
toursRoutes.get('/user/:userID',getToursByUser)
toursRoutes.get("/search/:tourType",getTourBySearch)
toursRoutes.delete('/tours/:id', deleteTour);
toursRoutes.post("/book/:id/:userID",updateTourToBooked)
toursRoutes.post("/tour/:id",updateTourDetails)
toursRoutes.get("/search/:tourType",getTourBySearch)





export default toursRoutes
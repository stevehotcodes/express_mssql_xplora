import { Router } from "express";
import { registerNewUser } from "../controllers/userControllers";
import { registrationSchema } from "../helpers/validators";



const userRoutes=Router();

userRoutes.post('/signup', registerNewUser)





export default userRoutes
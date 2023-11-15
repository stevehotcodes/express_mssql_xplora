import { Router } from "express";
import { loginUser, registerNewUser } from "../controllers/userControllers";
import { registrationSchema } from "../helpers/validators";



const userRoutes=Router();

userRoutes.post('/signup', registerNewUser);
userRoutes.post('/signin',loginUser)





export default userRoutes
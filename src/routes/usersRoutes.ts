import { Router } from "express";
import { deleteUser, getAllUsers, loginUser, registerNewUser } from "../controllers/userControllers";
import { registrationSchema } from "../helpers/validators";



const userRoutes=Router();
userRoutes.get("/all",getAllUsers)
userRoutes.post('/signup', registerNewUser);
userRoutes.post('/signin',loginUser);
userRoutes.delete('/users/:id',deleteUser)





export default userRoutes
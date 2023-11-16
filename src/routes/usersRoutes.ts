import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, loginUser, registerNewUser } from "../controllers/userControllers";
import { registrationSchema } from "../helpers/validators";



const userRoutes=Router();
userRoutes.get("/all",getAllUsers)
userRoutes.get("/one/:id",getUserById)
userRoutes.post('/signup', registerNewUser);
userRoutes.post('/signin',loginUser);
userRoutes.delete('/users/:id',deleteUser)





export default userRoutes
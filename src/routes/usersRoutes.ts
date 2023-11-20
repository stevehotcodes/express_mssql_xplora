import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, loginUser, registerNewUser, updateUser } from "../controllers/userControllers";
import { registrationSchema } from "../helpers/validators";
import { verifyToken } from "../middlewares/verifyToken";



const userRoutes=Router();
userRoutes.get("/all",getAllUsers)
userRoutes.get("/one/:id",getUserById)
userRoutes.post('/signup', registerNewUser);
userRoutes.post('/signin',loginUser);
userRoutes.put("/update/:id", verifyToken,updateUser)
userRoutes.delete('/users/:id',deleteUser)





export default userRoutes
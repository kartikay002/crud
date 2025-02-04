import express from "express";
import {validateToken} from "../middleware/authMiddleware.js";
import { userRegistration,loginUser,logoutUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/createUser",userRegistration);
authRouter.post("/loginUser",loginUser);
authRouter.post("/logoutUser",logoutUser,validateToken)

export {authRouter};
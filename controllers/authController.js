import User from "../models/user.js"
import bcrypt from "bcrypt";
import { ErrorResponse } from "../helpers/errorResponse.js";
import { userRegistrationService, loginUserService, userLogoutService } from "../sevices/authServices.js";
import jwt from "jsonwebtoken";
import { sendToken} from "../middleware/authMiddleware.js"



//user registration
   export const userRegistration = async (req,res) => {
        const {name,email,password} = req.body;
        try{

            // validating user missing fields
            if(!name||!email||!password){
                //return ErrorResponse.badRequest(res,error.message)
                return res.status(400).json({message:"All fields are mandatory"})
            }

            //check if user alredy exists
            const userExist = await User.findOne({email});
            if (userExist)
            {
                //return ErrorResponse.badRequest(res,error.message)
                return res.status(400).json({message:"user already exist"})
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password,10)

            
           // Register new user
            const user = await userRegistrationService({name,email,password:hashedPassword})

            const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "12h"});
           return sendToken(res,user,201,"registration succesful")
            
        }catch(error){
            return ErrorResponse.internalServerError(res,error.message)
        }
    }

    // login user
    export const loginUser = async(req,res) => {
       
        try {
            const {email,password} = req.body;
           if(!email||!password)
           {
            return ErrorResponse.badRequest(res,{message:"please enter both fields"})
           }
           // if user exist(Authenticate the user)
           const user = await loginUserService({email,password});

           //assign token
           const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h"});
           //Send token response
           return sendToken(res,user,200,`hello , ${user.name}`,token)

            //return res.status(200).json({user,message:"created"})
        }catch (error) {
            return ErrorResponse.internalServerError(res,error.message)
        }

    }

    //USER LOGOUT
    export const logoutUser = async(req,res )=>{
        try {
            const {success,message,cookieOptions:newCookieOptions} = await userLogoutService();
            return res
            .status(200)
            .cookie("token",null,{expires:new Date(Date.now()), httpOnly: true })
            .json({success,message});
            
        } catch (error) {
                return ErrorResponse.internalServerError(res,error.message)
            }
        }


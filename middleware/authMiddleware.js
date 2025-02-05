import jwt from 'jsonwebtoken'; // Import jwt if not already imported
//import dotenv from "dotenv";
import { ErrorResponse } from '../helpers/errorResponse.js';
//dotenv.config();

/*
export const validateToken = async(req,res,next) => {
    const token = req.cookies["blogsToken"];
    console.log(token)
    if(!token){
        return res.status(400).json({message:"token not found"});
    }
    const decoded_data = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded_data._id;
    next();
}
*/
//cookie creation


export const  cookieOptions ={
    maxAge : 24*60*60*1000,
    sameSite : "none",
    httpOnly: true,  //prevents client-side access
  }
  
export const sendToken = (res,user,code,message,token) => {  
    return res.status(code).cookie("blogsToken",token, cookieOptions).json({
        status : true,
        user:{
            id: user_id,
            name:user.name,
            email:user.email,

        },
        statusCode:code,
        message,
    });
  }

export const validateToken = async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user; // Attach the decoded user to the request object
            next(); // Move to the next middleware or route handler
        } catch (err) {
            console.error("Token verification failed:", err); // Log error for debugging
            return ErrorResponse.unauthorized(res,{ message: "User not authorized" });
        }
    } else {
        console.warn("Authorization header missing or in incorrect format"); // Log for debugging
        return ErrorResponse.unauthorized(res,{ message: "Token missing or incorrect format" });
    }
}




 
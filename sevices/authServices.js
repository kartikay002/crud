import bcrypt from "bcrypt";
import User from "../models/user.js"

 // create new user
export const userRegistrationService = async({name,email,password}) =>{

    const user = await User.create({
        name,
        email,
        password
    })
    return user;
}

export const loginUserService = async({email,password})=>{
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(400).json({message:"invalid email & password"});

    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.status(400).json({message:"invalid email & password"});   
    }
    return user;
}

export const userlogoutService = async() =>{
    return {
         success: true,
         message: "Logout successful",
         cookieOptions: { httpOnly: true, expires: new Date(0) } // Clear token cookie
     };
 };

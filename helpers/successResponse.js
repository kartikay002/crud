
import jwt from "jsonwebtoken";

export const  cookieOptions ={
  maxAge : 24*60*60*1000,
  sameSite : "none",
  httpOnly: true,
}

export const sendToken = (res,user,code,message) => {
  const token = jwt.sign({ id: user._id }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' });

  return res.status(code).cookie("blogsToken",token, cookieOptions).json({
      status : true,
      statusCode:code,
      message,
  });
}
  
export class SuccessResponse {
    constructor(data, message = 'Success', statusCode = 200) {
      this.success = true;
      this.message = message;
      this.data = data;
      this.statusCode = statusCode;
    }
  
    static ok(res, data, message = 'OK') {
      return res.status(200).json(new SuccessResponse(data, message, 200));
    }
  
    static created(res, data, message = 'Created') {
      return res.status(201).json(new SuccessResponse(data, message, 201)); 
    }
  
    static accepted(res, data, message = 'Accepted') {
      return res.status(202).json(new SuccessResponse(data, message, 202));
    }
  
    static noContent(res, message = 'No Content') {
      return res.status(204).json(new SuccessResponse(null, message, 204));
    }
  }
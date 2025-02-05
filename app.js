import express from "express";
import { authRouter } from "./router/authRoutes.js";
import blogRouter from "./router/blogRoutes.js";
import { connectDB } from "./config/db.js";

//creating instance for express
const app = express();
app.use(express.json());
//url encoded
app.use(express.urlencoded({extented:true}))
app.get('/',(req,res) =>{
    console.log("CRUD blogs API")
})
app.use("/auth",authRouter)
app.use("/blog",blogRouter)


   // for running server on definedd port number
   //const PORT = process.env.PORT || 3001
   const PORT =3000
   app.listen(PORT,()=>{
   console.log(`server running at http://localhost:${PORT}`)
})

connectDB();
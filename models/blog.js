import mongoose from "mongoose";


const blogSchema = mongoose.Schema(
    {
        user_id:{
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "User",
        },
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,
    },
)

const Blog= mongoose.model("Blog",blogSchema)
export default Blog;

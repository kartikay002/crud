
import {getAllBlogService,createBlogService,getBlogByIdService,updatedBlogService,deletedBlogService} from "../sevices/blogServices.js";
import { SuccessResponse } from "../helpers/successResponse.js";

export const getAllBlog = async(req,res ) => {
    const blog= await getAllBlogService();
   SuccessResponse.ok(blog, message, 200)
}

export const createBlog = async(req,res) =>{
    const{title,content} = req.body;
    if(!title||!content){
        return res.status(400).json({message : "missings fields"})
    }

    const blog = await createBlogService({title,content,user_id:req.user})
    return res.status(200).json({
        success:true,
        message:"blog created"
    })
     SuccessResponse.created(blog, message, 201)

}

export const getBlogById = async (req,res) =>{
    const blog = await getBlogByIdService(req.params.id);
    SuccessResponse.created(blog, message, 201)

}

export const updatedBlog = async(req,res)=>{
    const {title,content} = req.body;
    const updatedBlog = await updatedBlogService({
        title,
        content,
        blog_id:req.params.id,
        //user_Id:req.user,
        user_id : req.user.id,
       }
    );
    SuccessResponse.created(updatedBlog, message, 201)

}

export const deletedBlog = async (req,res)=>{
    const blog = await deletedBlogService(req.params.id,req.user)
    SuccessResponse.created(deletedBlog, message, 201)
}


import Blog from "../models/blog.js"

// to get all blogs
export const getAllBlogService = async () => {
     const blog = await Blog.find();
        return blog;
};

export const createBlogService = async ({title, content,user_id})=>{
    const blog = await Blog.create({
        title,
        content,
        user_id,
    });
    await blog.save();
    return blog;
}
export const getBlogByIdService = async (blog_id) => {
    const blog = await Blog.findById(blog_id);
      if(!blog){
         throw new Error("blog not found")
      }
      return blog;
};



export const updatedBlogService = async (title,content,blog_id,user_Id) => {
    const blogs = await Blog.findById(blog_id);
       if(!blogs){
        throw new Error("blog not found")
       }
       if(blogs.user_id.toString() !== user_Id.toString()){
           throw new Error("user don't have permission to update other user's blog")
       }
       blogs.title =title||blogs.title;
       blogs.content = content || blogs.content;
       return await blogs.save();
};


export const deletedBlogService = async (blog_id,user_Id) => {
    const blogs = await Blog.findById(blog_id);
       if(!blogs){
          return res.status(404).json({message:"blog not found"})
       }
       if(blogs.user_id.toString() !== user_Id.toString()){
           return res.status(403).json({message:"User doesn't have permission to delete this blog"});
       }
       await Blog.deleteOne({_id :blog_id});
       return{message:"blog deleted succesfully"}

};

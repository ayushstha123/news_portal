import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create=async(req,res,next)=>{
    const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is an admin
console.log(req.body);
    if (!isAdmin) {
        return next(errorHandler(403, "You are not allowed to do that"));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,"All fields are required"));
    }
    const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost=new Post({
        ...req.body,
        slug,
        userId:req.user.id,
    })
    try {
        const savePost=await newPost.save();
        res.status(200).json(savePost); 
    } catch (error) {
        next(error);
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex || 0);
        const limit = parseInt(req.query.limit || 10);
        const sortDirection = req.query.order === 'asc' ? 1 : -1; // Corrected sort direction
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { postId: req.query.postId }),
            ...(req.query.search && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            })
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        next(error);
    }
};

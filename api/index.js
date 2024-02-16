import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './router/user.route.js'
import authRoutes from './router/auth.route.js'
import cookieParser from "cookie-parser";
dotenv.config();
const app=express();
const PORT=3000;

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('database connected');
}).catch((error)=>{
    console.log(error);
})
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})
app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes)
app.use((err,req,res,next)=>{ //middleware function to handle errors
    const statusCode=err.statusCode || 500;
    const message=err.message || 'internal server error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './router/user.route.js'
import authRoutes from './router/auth.route.js'
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

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes)
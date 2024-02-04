import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoute from './router/user.route.js'

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

app.use('/api/user',userRoute);
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

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
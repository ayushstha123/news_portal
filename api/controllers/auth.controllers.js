import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup=async(req,res,next)=>{
const {username,email,password}=req.body;
if(!username || !email || !password || username==='' || email==='' || password===''){
next(errorHandler(400,"All Fields are required"))
}
const hashedPassword=bcryptjs.hashSync(password,12);
const newUser=new User({
    username,
    email,
    password:hashedPassword,
});

try{
    await newUser.save();
    res.json("Signup Successful");
}catch(error){
next(error);
}}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "All Fields are required"));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        // Check if validUser has password property before comparing passwords
        if (!validUser.password) {
            return next(errorHandler(500, "User password is null or undefined"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, "Invalid email or password"));
        }

   
            const token = jwt.sign({ id: validUser._id, role:validUser.role }, process.env.JWT_SECRET);
    

        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }
};

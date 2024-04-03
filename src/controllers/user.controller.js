import userModel from "../models/user.model.js";
import generateAccessToken from "../services/generateAccessToken.js";
import { error, success } from "../services/utills/responseWrapper.js";
import bcrypt from 'bcrypt';

export async function signup(req,res){
    const{username,email,password}=req.body;
    console.log({username,email,password});
    try {
        if(!username || !email || !password){
            return res.send(error(400, "All fields required!"));
        }
        const existingEmail = await userModel.findOne({email});
        if(existingEmail){
            return res.send(error(409,"Email already exists!"));
        }

        const existingUsername = await userModel.findOne({username});
        if(existingUsername){
            return res.send(error(410,"username already exists!"));
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await userModel.create({email,username,password:hashedPassword});
   
        return res.send(success(201,{email,username}));
    } catch (err) {
        return res.send(error(500,err.message));
    }
}

export async function login(req,res){
    const{email,password}=req.body;
    console.log({email,password});
    try {
        if(!email || !password){
        return res.send(error(400,"All fields  required!"));
        }

        const checkUser = await userModel.findOne({email});
        if(!checkUser){
            return res.send(error(404,"Email not registered"));
        }

        const matched = await bcrypt.compare(password,checkUser.password);
        if(!matched){
            return res.send(error(401,"incorrect password"));
        }

        const accessToken = generateAccessToken({...checkUser})
        return res.send(success(201,{accessToken,username:checkUser.username,email:checkUser.email}));


    } catch (err) {
        return res.send(error(500,err.message));
    }
}
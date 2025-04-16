import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const genreateAccessAndRefreshTokens=async (email)=>{
    try {
        const user= await User.findOne({email});
        const accessToken = user.genereateAccessTokens()
        const refreshToken = user.genereateRefreshTokens()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const Register = async(req,res,next)=>{
    try {
    const{ firstname, lastname,password,email,gender, mobile, volunteertype, timeavailability} =  req.body;
    const findUser= await User.findOne({email});
    if(findUser){
        return res.json({msg:"Email already in use", status:false});
    }
    const encryptedPassword= bcrypt.hashSync(password,10);
    const send = await User.create({
        firstname,
        password:encryptedPassword,
        email,
        mobile,
        volunteertype,
        timeavailability,
    })
    if(!send){
        return res.json({msg:"Error while creating user", status:false});
    }
    return res.json({msg:"User Registered", status:true});
    } catch (error) {
        next(error);
    }
}

export const Login = async(req,res,next)=>{
    try {
        const {email, password}=req.body;
        const findUser= await User.findOne({email});
        if(!findUser){
            return res.json({msg:"Email not found", status:false});
        }
        const compare= bcrypt.compareSync(password, findUser.password);
        if(!compare){
            return res.json({msg:"Invalid Password", status:false});
        }
        delete findUser.password;
        const loggedInUser = await User.findById(findUser._id).select("-password -refreshToken")
        const accessToken = findUser.genereateAccessTokens();
        const refreshToken = findUser.genereateRefreshTokens();
        findUser.refreshToken = refreshToken
        await findUser.save({ validateBeforeSave: false })

        const options={
            httpOnly:true,
            secrure:true,
        }
        return res
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken,options)
        .json({
            msg:"Logged in successfully",
            status:true,
            user: loggedInUser,accessToken,refreshToken
        })
    } catch (error) {
        next(error);
    }
}

export const Logout = async(req,res,next)=>{
    try {
        const accessToken = req.cookies?.accessToken;
    const decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    const findUser = await User.findById(decodedToken?._id);
    if(!findUser){
        return res.json({msg:"Invalid User", status:false});
    }
    findUser.refreshToken="";
    findUser.save({validateBeforeSave:false});

    return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({
        msg:"logged out",
        status:true,
    });
    } catch (error) {
        next(error);
    }

}
export const refreshAccessToken=async(req,res,next)=>{
    const incomingRefreshToken= await req.cookies?.refreshToken;
    if(!incomingRefreshToken){
        return res.json({msg:"Unauthorised request", status:false});
    }
    try {
        const decodedToken=  jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        const findUser= await User.findById(decodedToken?._id);
        if(!findUser){
            return res.json({msg:"Invalid Refresh Token", status:false});
        }
        if(incomingRefreshToken!==findUser.refreshToken){
            return res.json({msg:"Login Expired", status:false});
        }
        const accessToken= findUser.genereateAccessTokens();
        const refreshToken= findUser.genereateRefreshTokens();
        findUser.refreshToken = refreshToken
        await findUser.save({ validateBeforeSave: false })
        const options={
            httpOnly:true,
            secure:true,
        }
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            msg:"Access Token Refreshed",
        })
    } catch (error) {
        next(error);
    }
}
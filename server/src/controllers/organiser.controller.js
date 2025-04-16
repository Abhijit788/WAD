import bcrypt from "bcrypt"
import { Organiser } from "../models/organiser.model.js";
export const newAdmin=async(req,res,next)=>{
    try {
        const {name,location,domain,password}=req.body;
        if(!name || !location || !domain || !password){
            return res.json({
                msg:"All domains are required",
                status:false,
            })
        }
        const hashedPassword = bcrypt.hashSync(password,10);
        const createAdmin = await Organiser.create({
            name,
            location,
            domain,
            password:hashedPassword
        })
        if(!createAdmin){
            return res.json({
                msg:"Error in creating new user",
                status:false,
            })
        }
        const send_user = {
            name:createAdmin.name,
            domain:createAdmin.domain,
            location:createAdmin.location,
        }
        return res.json({
            msg:"New user creted sucessfully",
            status:true,
            user:send_user
        })
    } catch (error) {
        next(error)
    }
}

export const adminLogin = async(req,res,next)=>{
    try {
        const{name,password}=req.body;
        if(!name || !password){
            return res.json({
                msg:"All fields are required",
                status:false,
            })
        }
        const findUser = await Organiser.findOne({name});
        if(!findUser){
            return res.json({msg:"No User Found", status:false});
        }
        console.log(findUser)
        console.log(password);
        const comparePass = bcrypt.compareSync(password,findUser.password);
        if(!comparePass){
            return res.json({
                msg:"Invalid Username or Password",
                status:false,
            })
        }
        const send_user = {
            _id:findUser._id,
            name:findUser.name,
            domain:findUser.domain,
            location:findUser.location,
        }
        return res.json({
            msg:"User Logged In",
            status:true,
            user:send_user,
        })

    } catch (error) {
        next(error);
    }
}
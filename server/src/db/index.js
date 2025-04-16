import mongoose from "mongoose";

const connectDb= async()=>{
    try {
        const status= await mongoose.connect(process.env.MONGODB_URL);
        if(!status){
            console.log("Error connecting to database");
        }
        else{
            console.log("Database connected Succesfully");
        }
    } catch (error) {
        console.log(error)
        process.exit(1);    
    }
}

export  default connectDb;
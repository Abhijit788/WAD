import express from "express";
import  connectDb from "../src/db/index.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
const app=express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin:"http://localhost:5173",
    }
));

const port=process.env.PORT;
connectDb();
app.use(express.json());
app.use("/", authRoutes);
app.listen(port,()=>{
    console.log(`App is listeing on port: http://localhost:${port}`);
})
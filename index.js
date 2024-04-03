import express from "express";
import dotenv from 'dotenv';
import userRouter from "./src/routers/user.router.js";
import connectDB from "./src/config/dbconfig.js";
import cors from 'cors'
import morgan from 'morgan'
dotenv.config();

const app = express();
const port = process.env.PORT ||3000;

app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.use("/user",userRouter);



app.listen(port,()=>{
    connectDB();
    console.log("server is running at ",port);
})
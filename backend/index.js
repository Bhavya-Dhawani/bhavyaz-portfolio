import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
const app = express();
app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import cors from 'cors';
if (process.env.MODE == 'developement') {
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
} else {
    app.use(
        cors({
            origin: process.env.CLIENT_URL,
            credentials: true,
        })
    );
};

import { connectDB } from "./config/db.config.js";
connectDB();

import { getUser } from './middlewares/auth.middlewares.js';
app.use(getUser);

// For Susta Up time robot.
app.get('/api/ping', (req, res) => {
    return res.status(200).json({ success: true, message: "Server Barobar Chaal rha h bhai" });
})

import authRouter from './routes/user.route.js';
app.use('/api/auth', authRouter);

// Nashedi BAckchod logo ke liyee hai yee 
import ExpressError from "./helpers/ExpressError.helper.js";
app.all("*splat", (req, res, next)=>{
    next(new ExpressError(404, "Joo routes hai unpe call maar n"));
});

// Yee neeche wala hii hai joo terko error dee rha h 
const errorHandler = (err, req, res, next) => {
    const { status = 500, message = " Something Went Wrong"} = err;

    console.log("😊😊Bhai dekh deenche teri app ko error hua h taja taja 😊😊");
    console.error(`Error: ${err}`);

    return res.status(status).json({
        success: false,
        message
    });
};

app.use(errorHandler);

app.get('/', (req, res) => {
    res.json(['res'])
})

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
    console.log("✅ Server Started at the below links.");
    console.log(`-Local:        ${process.env.LOCAL_URL}`)
    console.log(`-Network:      ${process.env.ROUTER_URL}`)
})

console.log("Hi")
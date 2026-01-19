import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';

import authRoutes from './routes/authRoutes.js';
import propertiesRoutes from "./routes/propertiesRoutes.js"
import chatbotRoutes from './routes/chatbotRoutes.js';


dotenv.config({ path: './.env' })
import connectDB from './db/connectDB.js';

const app = express();
const PORT = process.env.PORT || 5000;


// middlewares
import pageNotFound from './middlewares/pageNotFound.js';
import errorHandlerMiddleWare from './middlewares/errorHandler.js';

import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

// middleware to parse json body(to get data from request body/passed through post method)
app.use(express.json());
app.use(cookieParser());

// middleware to mount the auth & properties API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/properties", propertiesRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);

app.get('/', (req, res) => {
    res.json({message: "Data"});
  });

  
  app.use("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

// if above routes don't match then this works
app.use(pageNotFound)
// middleware for handling error in the existing routes
app.use(errorHandlerMiddleWare) // global catch 



// start server and connect to db
const startAndConnect = async() =>{
    try{
        await connectDB(process.env.DB_URL)
        app.listen(PORT, '0.0.0.0', ()=>{
            console.log(`Backend API listening on all interfaces at port ${PORT}`)
        })
    }catch(err){
        console.log("Error occured ", err)
    }
}

startAndConnect()
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';


import authRoutes from './routes/authRoutes.js';
import jobsRoutes from "./routes/jobsRoutes.js"

dotenv.config({ path: './.env' })
import connectDB from './db/connectDB.js';

const app = express();
const PORT = process.env.PORT || 4000

// middleware
import pageNotFound from './middlewares/pageNotFound.js';
import errorHandlerMiddleWare from './middlewares/errorHandler.js';

// middleware to parse json body(to get data from request body/passed through post method)
app.use(express.json());

// middleware to mount the auth & jobs API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobsRoutes);


app.get('/', (req, res) => {
    res.json({message: "Data"});
  });

// if above routes don't match then this works
app.use(pageNotFound)
// middleware for handling error in the existing routes
app.use(errorHandlerMiddleWare)

// console.log(process.env.DB_URL)

// start server and connect to db
const startAndConnect = async() =>{
    try{
        await connectDB(process.env.DB_URL)
        app.listen(PORT, ()=>{
            console.log("App Listening on port: ", PORT)
        })
    }catch(err){
        console.log("Error occured ", err)
    }
}

startAndConnect()
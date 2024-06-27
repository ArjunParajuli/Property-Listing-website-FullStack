import userModel from "../models/User.js"
import {StatusCodes} from 'http-status-codes';
import BadRequestError from "../errors/notFoundError.js";


const registerController = async(req, res, next) =>{
    // try{
    //     const user = await userModel.create(req.body)
    //     res.status(201).json(user)
    // }catch(err){
    //     // res.status(500).json({msg: "Error while registering the user"})
    //     // instead use next(err) to send error to the next middleware which is error handler
    //     next(err) 
    // }

    // --- use this code instead of above one ---
    // used import ‘express-async-error’ in server.js, so no need to write catch block now.
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        throw new BadRequestError("Please provide all fields!")  // throw custom error to the errorHandler middleware 
    }

    const userAlreadyExists = await userModel.findOne({email});
    if(userAlreadyExists) {
        throw new BadRequestError("Email already exists!")
    }

    const user = await userModel.create({name, email, password})
    res.status(StatusCodes.OK).json(user)
}

const loginController = (req, res) => {
    res.send("Ok login")
}

const updateUserController = (req, res) => {
    res.send("Ok updateUser")
}

export {registerController, loginController, updateUserController}
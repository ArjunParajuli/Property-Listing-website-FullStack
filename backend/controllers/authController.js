import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes';
import BadRequestError from "../errors/badRequestError.js";
import UnAuthenticatedError from "../errors/unAuthenticatedError.js";
import createCookie from "../utils/createCookie.js";


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
    
    
    const isFirstAccount = (await User.countDocuments())===0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        throw new BadRequestError("Please provide all fields!")  // throw custom error to the errorHandler middleware 
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists) {
        throw new BadRequestError("Email already exists!")
    }

    const user = await User.create(req.body)
    const jwtToken = user.createJWT(); // calling the instance func that returns us a jwt token for this particular user
    // create cookie which is sent to the client
    createCookie({res, jwtToken})
    res.status(StatusCodes.CREATED).json({ user:{name: user.name, lastName:user.lastName, email: user.email, location: user.location}, location:user.location}) // sending the user data and jwt token to the client
}

const loginController = async(req, res) => {
    const {email, password} = req.body; // user entered email & pw
    if(!email || !password) {
        throw new BadRequestError("Please provide all fields!")  // throw custom error to the errorHandler middleware 
    }
 
    // find the user document in the MongoDB database based on the provided email and to include the password field in the returned result,
    // we need to include .select('+password') as we previously set "select: false" in password in user schema. so to override this we must do this explicitely to also include the password in response. 
    const user = await User.findOne({email}).select('+password'); 

    if(!user){
        throw new UnAuthenticatedError('Invalid Email!')
    }

    // Credential(email) correct, so compare passwords
    // call the instance method for the current user instance, defined in User Schema to compare the pw
    const isPasswordCorrect = await user.comparePasswords(password);

    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid password!');
    }

    const jwtToken = user.createJWT();
    // dont send the pw in response(frontend), so mark the pw field as undefined
    user.password = undefined;
    
    // create cookie which is sent to the client
    createCookie({res, jwtToken})

    res.status(StatusCodes.ACCEPTED).json({user, location: user.location})
    
}

const updateUserController = async(req, res) => {
    try{
        const userId = req.user.userId;
        const {name, email, lastName, location} = req.body;
        const userData = await User.findOne({_id: userId})
        userData.name = name;
        userData.email = email;
        userData.lastName = lastName;
        userData.location = location;

        const updatedUser = await userData.save();
        const jwtToken = updatedUser.createJWT();  // update the jwtToken aslo, not compulsory
        // create cookie which is sent to the client
        createCookie({res, jwtToken})
        res.status(StatusCodes.CREATED).json({ user:{name: updatedUser.name, lastName:updatedUser.lastName, email: updatedUser.email, location: updatedUser.location}, location:updatedUser.location}) // sending the user data and jwt token to the client
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
    
}

const getCurrentUser = async(req, res) =>{
    const user = await User.findOne({_id: req.user.userId});
    res.status(StatusCodes.OK).json({user, location: user.location})
}

const logout = async(req, res) =>{
    // set the cookie named jwtToken a value of 'logout' and expire this cookie immediately. 
    res.cookie('jwtToken', 'logout', { 
        httpOnly: true,
        expires: new Date(Date.now()),
      });
      res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}

export {registerController, loginController, updateUserController, getCurrentUser, logout}
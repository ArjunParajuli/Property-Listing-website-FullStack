import UnAuthenticatedError from "../errors/unAuthenticatedError.js";
import jwt from 'jsonwebtoken';

const authenticateUser = async(req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError("Authorization Invalid!")
    }

    // split converts string into array according to ' '. So now we have ['Bearer', 'token']
    const jwtToken = authHeader.split(' ')[1]; 
    try{
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)
        // add userId in the request so that we can access it in updateController and also propertiesController
        req.user = {user: payload.userId}

        next() // calls the next middleware. After that control goes to updateUserController or propertiesController 
    }catch(err){
        console.log(err)
    }


    
}

export default authenticateUser;

import { StatusCodes } from "http-status-codes"

// handles the errors occuring in the existing routes
const errorHandlerMiddleWare = (err, req, res, next) =>{
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // if err object reveived contains statusCode then use that one 
        msg: err.message || "Something went Wrong! Try again later you alligator!"
    }
    
    // send short message in response instead of sending the whole big error message when validation error occurs
    // validation error includes missing fields, length less than minLength, etc.
    if(err.name === "ValidationError"){
        console.log(err.name)
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = err.message
    }

    // set error message when field is not unique(eg: using already registered email to register again).
    if(err.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `${Object.keys(err.keyValue)} field must be unique!`
    }

    /* -- send response --
     res.status(500).json({msg: err})
     instead use below one */
    res.status(defaultError.statusCode).json({msg: defaultError.msg})
}

export default errorHandlerMiddleWare
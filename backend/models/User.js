import mongoose from "mongoose"; 
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide your name"],   
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please provide your email"],   
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: "Please provide valid email"
        },
    },
    password:{
        type: String,
        required: [true, "Please provide password"],   
        minLength: 5,
        maxLength: 20
    },
    location:{
        type: String,
        trim: true,
        default: 'my city',
    }
})

const userModel = mongoose.model("userModel", userSchema);
export default userModel
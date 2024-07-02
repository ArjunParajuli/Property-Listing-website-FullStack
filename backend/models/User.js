import mongoose from "mongoose"; 
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide your name"],   
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    lastName:{
        type: String,  
        minLength: 3,
        maxLength: 20,
        trim: true,
        default: 'lastname'
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
        maxLength: 20,
        select: false
    },
    location:{
        type: String,
        trim: true,
        default: 'my city',
    }
})

// middleware that runs before the document is saved in the db
// not using arrow func bcoz we need to use this poiinter
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);

    // no need to use next() while using promises or async/await syntax as we're using express-async-error package
})

// defining the function that'll return the JWT 
userSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

const User = mongoose.model("User", userSchema);
export default User
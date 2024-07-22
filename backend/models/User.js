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
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);

    // no need to use next() while using promises or async/await syntax as we're using express-async-error package
})

// defining the function that'll return the JWT 
userSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

// instance method for comparing user entered password with db pw.
// whenever in the login controller this method is called then for the current logging in user, this method will be called. 
// i.e. user entered pw ko entered email wala pw se compare kiya jayega
userSchema.methods.comparePasswords = async function(enteredPassword){
    const isCorrectPw = await bcrypt.compare(enteredPassword, this.password) // this will refer to the user object that called this function
    return isCorrectPw
}  

const User = mongoose.model("User", userSchema);
export default User
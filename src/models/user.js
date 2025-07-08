const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

//schema -> model -> document
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        maxLength: 30,
        minLength:3,
    },
    lastName:{
        type:String,
        maxLength: 30,
        minLength:3,
    },
    emailID:{
        type:String,
        trim: true,
        lowercase: true,
        required: true,
        maxLength: 30,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    password:{
        type: String,
        required: true, 
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("enter a strong password "+ value);
            }
        }
    },
    age:{
        type:Number,
        min: 18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
    },
    about: {
        type: String,
        default: "Hi i am user",
    },
    skills: {
        type: [String],
    },
},
{
    timestamps:true,
}
);
//schema methods= using this methods makes our function reusable 

userSchema.methods.getJWT = async function () {
    const user= this;//this "this" keyword will work with normal function not with arrow function
    const token =  await jwt.sign({_id : user._id}, "Dev@tinder321",{expiresIn:"7d"});
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid= await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
};

module.exports = mongoose.model("User",userSchema);

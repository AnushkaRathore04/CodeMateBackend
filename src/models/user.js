const mongoose = require("mongoose");

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
    },
    password:{
        type: String,
        required: true,
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
//model 
module.exports = mongoose.model("User",userSchema);

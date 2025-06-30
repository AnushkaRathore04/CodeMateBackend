const mongoose = require("mongoose");

//schema -> model -> document
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailID:{
        type:String,
    },
    password:{
        type: String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
});
//model
module.exports = mongoose.model("User",userSchema);

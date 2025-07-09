const validator = require("validator");
const validateSignUpData = (req) => {
    const {firstName, lastName,emailID, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter your name ");
    }
    else if(!validator.isEmail(emailID)){
        throw new Error("Please enter correct emailID ");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password ");
    }
};
const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName","lastName","emailID","photoUrl","about","age","gender","skills"];
    const isEditAllowed = Object.keys(req.body).every((field) =>
         allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {validateSignUpData,validateEditProfileData};
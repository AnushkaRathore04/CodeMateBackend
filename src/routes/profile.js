const express = require("express");
const profileRouter = express.Router();

const {adminAuth} = require("../middlewares/auth");
const User = require("../models/user");
const {validateEditProfileData} = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", adminAuth,async (req,res) => {
   try{
      const user = await req.user;
      res.send(user);
   }catch(err){
      res.status(400).send("ERROR : " +err.message);
   }
});

profileRouter.patch("/profile/edit", adminAuth, async (req,res) => {

    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key]
        });

        if(loggedInUser?.skills.length > 10){
            throw new Error("Skills are greater than 10 ");
        }
        if(loggedInUser?.about.length > 100){
            throw new Error("About length is greater than 100 ");
        }
        if(req.body.emailID && !validator.isEmail(req.body.emailID)) {
                   throw new Error("Invalid email");
        }
        if(!["male","female","others"].includes(req.body.gender)){
                throw new Error("Gender data is not valid");
            }

        await loggedInUser.save();

        res.json({
            message:`${loggedInUser.firstName}, your profile updated successfully`,
            data:loggedInUser,
        });
    }catch(err){
        res.status(401).send("Error "+ err.message);
    }
});

profileRouter.patch("/password/edit", adminAuth,async (req,res) => {
   try{
    const user = req.user;
    const {password}= req.body;

    const isSame= await bcrypt.compare(password,user.password);
    if(isSame){
        throw new Error("New password must be different from the old one");
    }
    const passwordHash = await bcrypt.hash(password,10);
    user.password = passwordHash;
    await user.save();

    res.send("Password updated successfully");
   }catch(err){
      res.status(400).send("ERROR : " +err.message);
   }
});

module.exports =profileRouter;
const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require('../utils/validation');
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup",async(req,res)=>{   
   try{
      //validation of data
      validateSignUpData(req);
      //encrypting the password
      const {firstName, lastName, emailID,password} = req.body;

      // check if user already exists
      const existingUser = await User.findOne({ emailID });
      if (existingUser) {
         throw new Error("User already exists with this email");
      }

      const passwordHash = await bcrypt.hash(password,10);
      //creating a new instance of a user model
      const user = new User({
         firstName,
         lastName,
         emailID,
         password : passwordHash,
      });
      const savedUser = await user.save();//this will return a promise

      const token  = await savedUser.getJWT();//so we have offloaded our jwt logic to our schema method
      res.cookie("token",token,{
         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      
      res.json({message:"user added successfully!", data: savedUser});
   }catch(err){
      res.status(400).send("Error: " +err.message);
   }
});

authRouter.post("/login", async (req,res) => {
   try{
      const {emailID,password} =req.body;
      const user= await User.findOne({emailID:emailID});
      if(!user){
         throw new Error("Invalid credentials");
      }
      const matchPassword = await user.validatePassword(password);
      if(matchPassword){

         //create JWT token
          const token  = await user.getJWT();//so we have offloaded our jwt logic to our schema method

         //Add the token to cookie and send the response back to the user
         res.cookie("token",token,{expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});
         res.send(user);
      }else{
         throw new Error("Invalid credentials");
      }
   }catch(err){
      res.status(400).send("ERROR : " +err.message);
   }
});

authRouter.post("/logout",async (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout successfully");
});

module.exports=authRouter;
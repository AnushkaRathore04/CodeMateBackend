const express = require("express");
const profileRouter = express.Router();

const {adminAuth} = require("../middlewares/auth");
const User = require("../models/user");

//profile request
profileRouter.get("/profile", adminAuth,async (req,res) => {
   try{
      const user = req.user;
      res.send(user);
   }catch(err){
      res.status(400).send("ERROR : " +err.message);
   }
});

module.exports =profileRouter;
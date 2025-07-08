const express = require("express");
const requestRouter = express.Router();

const {adminAuth} = require("../middlewares/auth")
const User = require("../models/user");

//sending connection request
requestRouter.post("/sendConnectionRequest",adminAuth, async(req,res) => {
   const user= req.user.firstName;
   res.send(user+" send the connection request");
})

module.exports= requestRouter;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = async (req,res,next) =>{
    try{
          const cookies = req.cookies;
          const {token} = cookies;
          if(!token){
             throw new Error("Invalid token!!!!");
          }
          //verify my token
          const decodedMessage = await jwt.verify(token,"Dev@tinder321");
          const {_id} = decodedMessage;
          const user = await User.findById(_id);
          if(!user){
             throw new Error("Invalid user");
          }
          req.user=user;//whatever we have found from database we have attached in next now it will go as a request back to user
          next();
       }catch(err){
          res.status(400).send("ERROR : " +err.message);
       }
};

module.exports = {adminAuth};
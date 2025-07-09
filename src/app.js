const express = require('express');//creation server
const {connectDb} = require("./config/database");
const app = express();//creating instance of new application of express
const cookieParser = require("cookie-parser"); //to read cookie

app.use(express.json());//sending data dynamically. adding express.json middleware
app.use(cookieParser());//adding cookieParser middleware

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//find user with email
app.get("/user", async (req,res) => {
   const useremail = req.body.emailID;
   // const userid = req.body._id;

   try{
      // const users = await User.findById(userid);
      // res.send(users);
      const users = await User.find({emailID : useremail});
      if(users.length === 0){
         res.status(401).send("not found");
      }else{
         res.send(users);
      }
   }catch(err){
      res.status(404).send("something went wrong");
   }
});
//to get all data
app.get("/feed", async (req,res) => {
   try{
      const users = await User.find({});
      res.send(users);
   }catch(err){
      res.status(404).send("something went wrong");
   }
});

//delete user data
app.delete("/remove", async (req,res) => {
   const userID = req.body._id;
   try{
      const users = await User.findByIdAndDelete(userID);
      res.send("user deleted successfully");
   }catch(err){
      res.status(404).send("something went wrong");
   }
});

connectDb()
   .then(() =>{
      console.log("database connection established..");
      //to creating a new server we have to listen to the incoming request
      app.listen(7777, () =>{
      console.log("server is running successfully on port 7777...");
      });
   })
   .catch((err) =>{
      console.log("database cannot be connected");
   });
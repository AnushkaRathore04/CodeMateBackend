//creation server
const express = require('express');
const {connectDb} = require("./config/database");
//creating instance of new application of express
const app = express();
const User = require("./models/user");

//sending data dynamically. adding express.json middleware
app.use(express.json());

//creating first api which will insert data into our database
app.post("/signUp",async(req,res)=>{
   //creating a new instance of a user model
   const user = new User(req.body);
   try{
      if(user?.skills.length > 10){
         throw new Error("update not allowed skills are greater than 10 ")
      }
      await user.save();//this will return a promise
      res.send("user added successfully");
   }catch(err){
      res.status(400).send("error saving the user:" +err.message);
   }
});

//getting data from database

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

//update data
app.patch("/update/:userId", async (req,res) => {
   const userId = req.params?.userId;
   const value = req.body;
   try{
      const Allowed_updates=["photoUrl","about","age","gender","skills"];
      const isUpdateAllowed= Object.keys(value).every((k) =>
         Allowed_updates.includes(k)
      );
      if(!isUpdateAllowed){
         throw new Error("update not allowed ");
      }
      if(value?.skills.length > 10){
         throw new Error("update not allowed skills are greater than 10 ")
      }
      const user = await User.findByIdAndUpdate(userId,value,{
         runValidators: true,
      });
      res.send("user updated");
   }catch(err){
      res.status(401).send("something went wrong "+ err.message);
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
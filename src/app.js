const express = require('express');//creation server
const {connectDb} = require("./config/database");
const app = express();//creating instance of new application of express
const cookieParser = require("cookie-parser"); //to read cookie
const cors = require("cors");

app.use(
   cors({
      origin: "http://16.170.248.154",
      credentials:true,
   })
);
app.use(express.json());//sending data dynamically. adding express.json middleware
app.use(cookieParser());//adding cookieParser middleware

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
//this is the starting point od application here we will write all our nodejs code

 //creation server
 const express = require('express');

 //creating instance of new application of express
 const app = express();


const { adminAuth } = require('./middlewares/auth');

 //middleware
app.use("/admin",adminAuth);


 app.get("/admin/getAllData",(req,res) => {
   //logic for checking if request is authorized
   res.send("data sent");
 });

 app.get("/admin/deleteUser",(req,res) => {
   res.send("deleted data");
 });

 //to creating a new server we have to listen to the incoming request
 app.listen(3000, () =>{
    console.log("server is running successfully on port 3000...");
 }); // app is listening on port 3000


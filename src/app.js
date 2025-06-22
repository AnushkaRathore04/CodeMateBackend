//this is the starting point od application here we will write all our nodejs code

 //creation server
 const express = require('express');

 //creating instance of new application of express
 const app = express();   //this is like creating a new server 

 //code for handling incoming request
 // ["/rest" is request handler for rest, now server will response to (localhost:3000/rest)]
 app.use("/rest",(req,res) => {
    res.send("Hello from the server! ")
 })

 app.use("/hello",(req,res) => {
    res.send("server! ")
 })
 //to creating a new server we have to listen to the incoming request
 app.listen(3000, () =>{
    console.log("server is running successfully on port 3000...");
 }); // app is listening on port 3000


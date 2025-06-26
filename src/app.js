//this is the starting point od application here we will write all our nodejs code

 //creation server
 const express = require('express');

 //creating instance of new application of express
 const app = express();   //this is like creating a new server 

 //code for handling incoming request

 //if we introduce this ("/") rout handler that it will override other rout handler 
//  app.use("/",(req,res) => {
//     res.send("Anushka Here! ");
//  });

//get call to get data
// app.get("/user", (req,res) =>{
//    res.send({firstNAme: "Anushka", lastName: "Rathore"});
// });

//post call
// app.post("/user",(req,res) => {
//    res.send("data saved successfully to database");
// });

//delete call
// app.delete("/user",(req,res) => {
//    res.send("data deleted successfully");
// });

 // ["/rest" is request handler for rest, now server will response to (localhost:3000/rest)]
//  app.use("/rest",(req,res) => {
//     res.send("Hello from the server! ");
//  });


//chaining


  app.use("/user",
   (req,res,next) => {
   console.log("handling errors!!");
   // res.send("Hello from the server!");
   next();
 },
(req,res,next)=>{
   console.log("handling errors2!!");
   //res.send("Hello from the server2 !");
   next();
},
(req,res,next)=>{
   console.log("handling errors3!!");
   //res.send("Hello from the server3 !");
   next();
},
(req,res,next)=>{
   console.log("handling errors4!!");
   //res.send("Hello from the server4 !");
   next();
},
(req,res)=>{
   console.log("handling errors5!!");
   res.send("Hello from the server5 !");
});


//  app.use("/hello",(req,res) => {
//     res.send("server! ");
//  });

//  app.use("/",(req,res) => {
//     res.send("Anushka Here! ");
//  });

 //to creating a new server we have to listen to the incoming request
 app.listen(3000, () =>{
    console.log("server is running successfully on port 3000...");
 }); // app is listening on port 3000


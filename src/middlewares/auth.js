const adminAuth = (req,res,next) =>{
    const token = "xyz";
    const isAuthenticToken = token === "xyz";
    if(!isAuthenticToken){
        res.status(401).send("unauthorized request");
    }else{
      next();
   }
};

module.exports = {adminAuth};
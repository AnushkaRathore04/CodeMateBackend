const mongoose = require("mongoose");

//creating schema
const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//Reference to the user collection
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type: String,
        required:true,
        enum:{
            values: ["ignored", "interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        },
    },  
},
{timestamps:true,}
);

//compound index
//connectionRequest.find({toUserId:6869848ba921671ec5a7deb3,fromUserId:6869848ba921671ec5a7deb3})
connectionRequestSchema.index({toUserId:1,fromUserId:1});

//pre middleware
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    //check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){//to parse data as toUserId and fromUserId is object
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
});

//creating model
const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequest;
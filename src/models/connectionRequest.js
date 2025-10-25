const mongoose = require("mongoose");
const requestsRouter = require("../router/requests");

const connectionRequestSchema =  new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status:{
        type:String,
        enum:{
            values :["accepted","rejected","ignored","interested"],
            message:`{VALUE} is not supported`,

        },
    },
},
{timestamps:true}
);

connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connectionRequest to yourself");
    }
    next();

}) 
module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema);

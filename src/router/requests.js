const express = require("express");
const requestsRouter = express.Router();
const {userAuth} = require( "../middlewire/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
requestsRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res) =>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
      throw new Error("Invalid Staus Value");
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      throw new Error("User not found");
    }

    //check if request already exists
    const existingRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId:fromUserId},
      ],
    });
    if(existingRequest){
      throw new Error("Connection request already exist between two users");
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      
      status,
    });
    const data = await connectionRequest.save();
    res.json({
      message:"connection Request Sent Successfully",
      data,
    });
  }
  catch(err){
    res.status(400).send("error sending request" + err.message);
  }
});
module.exports = requestsRouter;
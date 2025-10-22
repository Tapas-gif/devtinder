const express = require("express");
const requestsRouter = express.Router();
const {userAuth} = require( "../middlewire/auth");
requestsRouter.post("/sendRequest",userAuth, async (req,res) =>{
  const user = req.user;
  console.log("send connection request");
  res.send(user.FirstName + "send connection request");
});
module.exports = requestsRouter;
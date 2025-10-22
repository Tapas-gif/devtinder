const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require( "../middlewire/auth");
profileRouter.get("/profile",userAuth,async (req,res)=>{
try{
  const user = req.user;
  res.send(user);
}
catch(err){
    res.status(404).send("error fetching user", + err.message);
  }
});
module.exports = profileRouter;
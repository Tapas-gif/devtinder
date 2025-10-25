const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require( "../middlewire/auth");
const {validateLoginData} = require("../utills/validation")
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
try{
  const user = req.user;
  res.send(user);
}
catch(err){
    res.status(404).send("error fetching user", + err.message);
  }
});
profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
    try{
        validateLoginData(req);

        const logedInUser = req.user;
        console.log(logedInUser);
        Object.keys(req.body).forEach((k)=>(
            logedInUser[k] = req.body[k]
        ))
        console.log(logedInUser);
        await logedInUser.save();
        res.send(`${logedInUser.FirstName},profile updated successfuly`);
    }
    catch(err){
        res.status(404).send("error updating profile" + err.message);
}
})

module.exports = profileRouter;
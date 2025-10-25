const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {validateSignupData} = require("../utills/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req,res)=>{

  
    //const user = new User({
     //   FirstName: "Tapas",
       // LastName: "Parida",
      //Emailid: "tapasparia@.com",
       // password:"12345",
    //});

    try{
      // validateSignupData now returns normalized fields
      const { FirstName, LastName, emailid, password } = validateSignupData(req);
      console.log(req.body);
      const passwordHash = await bcrypt.hash(password,10);
      // Save both variants to be compatible with existing DB documents/indexes
      const user = new User({
        FirstName,
        LastName,
        emailid,
        password: passwordHash,
      });

      await user.save();
      res.status(201).send("User created successfully");
    } catch(err) {
        // If it's a duplicate key error for EmailId, return a clearer message
        if (err.code === 11000 && err.keyPattern && err.keyPattern.EmailId) {
            return res.status(409).send("Email already in use");
        }
        res.status(400).send("error saving the user: " + err.message);
    }
   
});
//get user by emailid
authRouter.post("/login", async (req,res) => {
  try{
    // accept common email keys from client
    
    const { emailid,password } = req.body;
    if (!emailid || !password) {
      return res.status(400).send("Email and password are required");
    }

  // Find by either casing/variant to be tolerant of existing documents
  const user = await User.findOne({emailid: emailid});
    if(!user){
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      //create a jwt token
      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      });

      return res.send("Login successful");
    }
  }
  catch(err){
    res.status(404).send("error fetching user: " + err.message);
  }
});
authRouter.post("/logout", async (req,res)=>{
    try{
        res.cookie("token",null,{
            expires: new Date(Date.now()),
        })
        res.send("logout successful");
    }
    catch(err){
        res.status(404).send("error loging out:" + err.message);
    }
})
module.exports = authRouter;
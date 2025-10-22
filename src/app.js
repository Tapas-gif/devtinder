const express=require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestsRouter = require("./router/requests");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestsRouter);





app.get("/user", async (req,res)=>{
  const useremail = req.body.Emailid;
  try{
    const users = await User.find({Emailid: useremail});
    if(users.length === 0){
      res.status(404).send("user not found");
    }else {
      res.send(users);{

      }
    }
  }
  catch(err){
    res.status(404).send("error fetching user");
  }
});

//Feed-Api = GET/feed get the all the users from f the database

app.get("/feed", async (req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  }
  catch (err){
    res.status(404).send("error fetching users");
  }
})
//delete user by id
app.delete("/user", async (req,res) =>{
   const userId = req.body.userId;
   try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
   }
   catch (err){
    res.status(404).send("error deleting user");
   }
});
//update user by id
app.patch("/user/:userid", async (req,res) =>{
  const userId = req.params?.userId;
  const data = req.body;
  try{
    const ALLOWED_UPDATES = ["skill","gender","photourl","age"];
    const isAllowedUpdate = Object.keys(data || {}).every((k)=> ALLOWED_UPDATES.includes(k)
  );
  if(!isAllowedUpdate){
    throw new Error("Invalids Updates");
  }
  if(data?.skills.length>10)
  {
    throw new Error("Skills should not be greater than 10");
  }
    const user = await User.findByIdAndUpdate(userId,Data,{
      runValidators:true,
    });
    console.log(user);
    res.send("Use updated successfully");
  }
  catch (err){
    res.status(404).send("UPDATE FAILED:" + err.message);
  }
});

connectDB()






  .then(() => {
  console.log("database established");
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
})
.catch((err) => {
  console.log("error in connecting to database", err);
});
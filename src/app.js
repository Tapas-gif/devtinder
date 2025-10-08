const express=require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignupData} = require("./utills/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req,res)=>{

  
    //const user = new User({
     //   FirstName: "Tapas",
       // LastName: "Parida",
      //Emailid: "tapasparia@.com",
       // password:"12345",
    //});

    try{
      validateSignupData(req);
      const{FirstName,LastName,emailid,password} = req.body;
      const passwordHash = await bcrypt.hash(password,10);
      const user = new User({
        FirstName,
        LastName,
        emailid,
        password:passwordHash,
      });
      
         await user.save();
    res.send("Data added to successfully");
    }catch(err) {
        res.status(400).send("error saving the user:" + err.message);
    }
   
});
//get user by emailid
app.post("/login", async (req,res) => {
  try{
    const{emailid,password} = req.body;
    const user = await User.findOne({emailid:emailid});
    if(!user){
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      //create a jwt token
      const token = await jwt.sign({_id: user._id},"RAT@MOUSE$89");

      res.cookie("token", token);
    

      res.send("Login successful");
    }
  }
  catch(err){
    res.status(404).send("error fetching user");
  }
});
app.get("/profile",async (req,res)=>{
try{
  const cookies = req.cookies;
  const{token} = cookies;
  if(!token){
    throw new Error("No token found");
  }
  const decoded = await jwt.verify(token,"RAT@MOUSE$89");
  const {_id} = decoded;
  const user = await User.findById(_id);
  console.log("loged in user:", + _id)
  if(!user){
    throw new Error("User not found");
  }
  res.send(user);
}
catch(err){
    res.status(404).send("error fetching user", + err.message);
  }
});
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
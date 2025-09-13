const express=require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());


app.post("/signup", async (req,res)=>{

  const user = new User(req.body);
    //const user = new User({
     //   FirstName: "Tapas",
       // LastName: "Parida",
      //Emailid: "tapasparia@.com",
       // password:"12345",
    //});

    try{
         await user.save();
    res.send("Data added to successfully");
    }catch(err) {
        res.status(400).send("error saving the user:" + err.message);
    }
   
});
//get user by emailid
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
app.patch("/user", async (req,res) =>{
  const userId = req.body.userId;
  const Data = req.body;
  try{
    const user = await User.findByIdAndUpdate(userId,Data);
    res.send("Use updated successfully");
  }
  catch (err){
    res.status(404).send("erroe updating user");
  }
})

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
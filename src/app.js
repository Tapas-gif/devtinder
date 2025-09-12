const express=require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req,res)=>{
    const user = new User({
        FirstName: "Tapas",
        LastName: "Parida",
        Emailid: "tapasparia@.com",
        password:"12345",
    });

    try{
         await user.save();
    res.send("Data added to successfully");
    }catch(err) {
        res.status(400).send("error saving the user:" + err.message);
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
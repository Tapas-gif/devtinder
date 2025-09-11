const express=require("express");

const app = express();

app.get("/getUserdata",(req,res) =>{
    //write you DB logic here


    throw new error("DB connection failed");
    res.send("user data");
});
app.use("/",(err,req,res,next) =>{
    res.status(500).send("something went wrong" +err.message);
});
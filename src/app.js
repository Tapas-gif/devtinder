const express=require("express");

const app = express();

app.use("/" , (req,res)=>{
    res.send("hello world");
});

app.listen(3000,()=>{
    console.log("server is succesfully listen on port 3000");
});
const express=require("express");

const app = express();

app.get("/hello/2", (req,res)=>{
    res.send("hello 2");
});
app.post("/hello", (req,res)=>{
    res.send("hello");
})

app.use("/" , (req,res)=>{
    res.send("hello world");
});

app.listen(3000,()=>{
    console.log("server is succesfully listen on port 3000");
});
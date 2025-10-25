const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) =>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("No token found");
        }
        const decoded = await jwt.verify(token,"RAT@MOUSE$89");
        const{_id} = decoded;
        const user = await User.findById(_id);
        req.user = user;
        console.log("Authenticated user:", user);
        if(!user){
            throw new Error("user not found");
        }
        next();
    }
    catch(err){
        res.status(401).send("unauthorized: No tokemn provided" + err.message);
    }
};
module.exports = {
    userAuth,
};
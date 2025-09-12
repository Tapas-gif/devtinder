const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    Emailid:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
});
module.exports = mongoose.model("User",userSchema);
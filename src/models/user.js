const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
    },
    LastName:{
        type:String,
        minLength:4,
        maxLength:20
    },
    emailid:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
                {
                    throw new Error("Email is not valid");
                }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
                {
                    throw new Error("Enter a strong password");
                }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    photourl:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
    },
    skills : {
        type: [String],
        require : true,
    },

    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value))
            {
                throw new Error("Gender Data is not valid");
            }
        }
    },
},
{
    timestamps:true,
}
);
userSchema.methods.getJWT = async function(){
    const user = this;
    const token  = await jwt.sign({_id:user._id},"RAT@MOUSE$89",{expiresIn:"7d"});
    return token;
}
module.exports = mongoose.model("User",userSchema);
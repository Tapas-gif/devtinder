const mongoose = require("mongoose");

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
    Emailid:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
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
module.exports = mongoose.model("User",userSchema);
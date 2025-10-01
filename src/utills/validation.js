const validator = require("validator");
const validateSignupData = (req) => {
    const{FirstName , LastName ,emailid , password} = req.body;
    if(!FirstName || !LastName){
        throw new Error("Name must not be empty");
    }
    else if(!validator.isEmail(emailid))
    {
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
}
module.exports = {validateSignupData};
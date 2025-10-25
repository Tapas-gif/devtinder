const validator = require("validator");

// validateSignupData now normalizes common email field names and returns
// the normalized values so callers can use a single `email` variable.
const validateSignupData = (req) => {
    const { FirstName, LastName,emailid, password } = req.body;
    // accept multiple possible email key names and normalize to `email`
   

    if (!FirstName || !LastName) {
        throw new Error("Name must not be empty");
    }

    if (!emailid) {
        throw new Error("Email is required");
    }

    if (!validator.isEmail(emailid)) {
        throw new Error("Email is not valid");
    }

    if (!password) {
        throw new Error("Password is required");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }

    // return normalized values for convenience
    return { FirstName, LastName, emailid, password };
};
const validateLoginData = (req)=>{
    const validateEditFields = ["FirstName","LastName","skills","age","gender","photourl"];
    const Data = req.body;
    const isAllowedEdit = Object.keys(Data ||{}).every((k)=> validateEditFields.includes(k));

    if(!isAllowedEdit){
        throw new Error("Invalid Edit Fields");
    }
    return true;
}

module.exports = { validateSignupData,validateLoginData };
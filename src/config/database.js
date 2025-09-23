const mongoose = require("mongoose");


const connectDB = async() => {
    await mongoose.connect  ("mongodb+srv://tapas:Tapas1234@cluster0.u68yi1f.mongodb.net/devtinder");
}

module.exports = connectDB;
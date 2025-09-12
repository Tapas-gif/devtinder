const mongoose = require("mongoose");


const connectDB = async() => {
    await mongoose.connect  ("mongodb+srv://tapas:ZBbbQpmZD1n2YF1b@cluster0.u68yi1f.mongodb.net/devtinder");
}

module.exports = connectDB;
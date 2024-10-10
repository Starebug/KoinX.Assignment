const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.Mongo_URI,{});
        console.log(`MongoDB Connected : ${connection.connection.host}`)
        
    }catch(e) {
        console.log("Error connecting to the database",e);
        process.exit();
    }
}
module.exports = {connectDB};
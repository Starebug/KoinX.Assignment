const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async() => {
    try{
        const connection = await mongoose.connect("mongodb+srv://22326:Dontcare%40123@cluster0.d1sa0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{});
        console.log(`MongoDB Connected : ${connection.connection.host}`)
        console.log(process.env.MONGO_URI)
        
    }catch(e) {
        console.log("Error connecting to the database",e);
        process.exit();
    }
}
module.exports = {connectDB};
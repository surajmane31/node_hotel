const mongoose = require('mongoose');

// Connect to MongoDB
const connectDb = async (req,res)=>{
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/person")
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDb;
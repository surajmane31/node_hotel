const mongoose = require("mongoose");
require("dotenv").config();
// Connect to MongoDB
const connectDb = async (req, res) => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/person")
    // const conn = await mongoose.connect(process.env.MANGODB_URL);
    // "mongodb+srv://mane315161:Suraj1234@cluster0.svhrzst.mongodb.net/"
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;

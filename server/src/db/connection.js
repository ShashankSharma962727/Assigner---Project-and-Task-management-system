const mongoose = require("mongoose");

const connectDB = async (URI) => {
  await mongoose.connect(URI);
  console.log("MongoDB Connected!");
};

module.exports = connectDB;

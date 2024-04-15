const mongoose = require("mongoose");
require('dotenv').config();
const process = require('process');

const connectDB = async () => {
        const uri = process.env.MONGODB_URI;
        console.log(uri);
    try {
        mongoose.connect(uri);
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
  }

connectDB();

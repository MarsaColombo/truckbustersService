const mongoose = require("mongoose");
require('dotenv').config();
const process = require('process');
const seedData = require('./seedData.js');

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

const init = async () => {  
    await connectDB();
    await seedData;
    process.exit(0);
}

init();
const mongoose = require("mongoose");
require('dotenv').config();
const process = require('process');
const express = require("express");
const app = express();
const appointmentRouter = require("./routes/appointment.js");
const seedData = require("./seedData.js");
const bodyParser = require("body-parser");


const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    console.log(uri);
    try {
        await mongoose.connect(uri);
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

const init = async () => {  
    await connectDB();
    seedData()
    app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}/`);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/appointments`, appointmentRouter);

app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error);
});
  
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});
  
init();
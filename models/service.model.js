const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [1, "Duration must be at least 1 minute"],
    max: [1440, "Duration cannot exceed 24 hours (1440 minutes)"],
  },
});

const Service = mongoose.model('Service', ServiceSchema)
module.exports = Service
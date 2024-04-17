const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TruckSchema = new Schema({
  brand: {
    type: String,
    required: [true, "Brand name is required"],
    minlength: [0, "Brand name must be at least 2 characters"],
    maxlength: [50, "Brand name cannot exceed 50 characters"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Model name is required"],
    minlength: [0, "Model name must be at least 2 characters"],
    maxlength: [50, "Model name cannot exceed 50 characters"],
    trim: true,
  },
  registration: {
    type: String,
    required: [true, "Registration number is required"],
    min: [0, "Registration number must be at least 8"],
    max: [10, "Registration number cannot exceed 10"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Truck = mongoose.model('Truck', TruckSchema);
module.exports = Truck;


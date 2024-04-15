const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TruckSchema = new Schema({
  _id: { type: Number, required: true },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  registration: {
    type: Number,
    required: true,
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

exports.Trucks = mongoose.model("Truck", TruckSchema);



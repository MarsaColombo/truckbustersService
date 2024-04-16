const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female", "other"],
  },
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
    minlength: [2, "Firstname must be at least 2 characters"],
    maxlength: [50, "Firstname cannot exceed 50 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
    minlength: [2, "Lastname must be at least 2 characters"],
    maxlength: [50, "Lastname cannot exceed 50 characters"],
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    minlength: [2, "Company name must be at least 2 characters"],
    maxlength: [100, "Company name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  phone_number: {
    type: Number,
    required: [true, "Phone number is required"],
    min: [1000000000, "Phone number must be at least 10 digits"],
    max: [9999999999, "Phone number cannot exceed 10 digits"],
  },
  promo_code: {
    type: String,
    minlength: [2, "Promo code must be at least 2 characters"],
    maxlength: [20, "Promo code cannot exceed 20 characters"],
  },
  truckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Truck",
    index: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

exports.Client = mongoose.model("Client", ClientSchema);

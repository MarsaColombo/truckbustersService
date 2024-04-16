const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
    validate: {
      validator: function(value) {
        return value < this.endTime;
      },
      message: "Start time must be before end time"
    }
  },
  endTime: {
    type: Date,
    required: [true, "End time is required"],
  },
  status: {
    type: String,
    default: "pending",
    required: [true, "Status is required"],
    enum: ["pending", "confirmed", "cancelled"]
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    index: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    index: true,
  },
});

exports.Appointment = mongoose.model("Appointment", AppointmentSchema);

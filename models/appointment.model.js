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

AppointmentSchema.virtual('overlappingAppointments').get(async function() {
  try {
    const Appointment = mongoose.model("Appointment");
    
    const overlappingAppointments = await Appointment.find({
      _id: { $ne: this._id }, 
      startTime: { $lt: this.endTime },
      endTime: { $gt: this.startTime }
    });

    return overlappingAppointments;
  } catch (error) {
    console.error('Error retrieving overlapping appointments:', error);
    return null;
  }
});

AppointmentSchema.set('toJSON', { virtuals: true });

exports.Appointment = mongoose.model("Appointment", AppointmentSchema);

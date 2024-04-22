const express = require("express");
const appointmentRouter = express.Router();

const {getAppointments, getAppointmentById, postAnAppointment, deleteAnAppointment,putAnAppointment  } = require("../controllers");

appointmentRouter.get("/", getAppointments);
appointmentRouter.post("/", postAnAppointment);
appointmentRouter.get("/appointment", getAppointmentById);
appointmentRouter.put("/appointment", putAnAppointment);
appointmentRouter.delete("/appointment", deleteAnAppointment);

module.exports = appointmentRouter;

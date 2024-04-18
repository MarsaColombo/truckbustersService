const express = require("express");
const appointmentRouter = express.Router();

const {getAppointments, getAppointmentById, postAnAppointment, deleteAnAppointment } = require("../controllers");

appointmentRouter.get("/", getAppointments);
appointmentRouter.post("/", postAnAppointment);
appointmentRouter.get("/appointment", getAppointmentById);
// appointmentRouter.put("/:id", controller.putAirPollution);
appointmentRouter.delete("/appointment", deleteAnAppointment);

module.exports = appointmentRouter;

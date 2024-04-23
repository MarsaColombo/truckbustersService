const express = require("express");
const appointmentRouter = express.Router();

const {getAppointments, getAppointmentById, postAnAppointment, deleteAnAppointment,putAnAppointment  } = require("../controllers");
/**
 * @swagger
 * /appointments:
 *   get:
 *     tags:
 *       - Appointments
 *     description: Returns all appointments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of appointments
 *         schema:
 *           $ref: '#/definitions/Appointment'
 * 
 * **/

appointmentRouter.get("/", getAppointments);
appointmentRouter.post("/", postAnAppointment);
appointmentRouter.get("/appointment", getAppointmentById);
appointmentRouter.put("/appointment", putAnAppointment);
appointmentRouter.delete("/appointment", deleteAnAppointment);

module.exports = appointmentRouter;

const {Service, ServiceSchema} = require("./service.model");
const {Client, ClientSchema} = require("./client.model");
const {Truck, TruckSchema} = require("./truck.model");
const Appointment = require("./appointment.model");

module.exports = {
  Service,
  ServiceSchema,
  Client,
  ClientSchema,
  Truck,
  TruckSchema,
  Appointment,
};


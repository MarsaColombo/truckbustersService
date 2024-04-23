const swaggerAutogen = require("swagger-autogen")();
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
      host: "localhost:500",
      schemes: ["http"],
      tags: [
        {
          name: "Appointments",
          description: "Endpoints for appointments",
        },
      ],
      swagger : "2.0",
      definitions: {
        Appointment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            startTime: { type: "string" },
            endTime: { type: "string" },
            status: { type: "string" },
            client: { type: "string" },
            service: { type: "string" },
          },
        },
      },
    },
    apis: ["../routes/appointment.js", "../models/appointment.model.js"], 
  };
  
const spec = swaggerJsdoc(options);

const outputFile = "./swagger-output.json";
const routes = ["../index.js"];

swaggerAutogen(outputFile, routes, spec).then(() => {
  require("../index.js");
});

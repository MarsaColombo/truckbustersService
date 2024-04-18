const helper = require("../helpers");
const { Appointment } = require("../models");

const getAppointments = async (req, res) => {
  try {
    const response = await helper.getAll(Appointment, req);
    if (!response) {
      return res.status(404).send("No appointments found");
    }
    if (response.error) {
      return res.status(500).send(response.error);
    }
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while getting appointments");
  }
};

const postAnAppointment = async (req, res) => {
  try {
    const response = await helper.postOne(Appointment, req);
    if (response.error) {
      return res.status(400).send(response.error);
    }
    return res.status(201).send(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while creating an appointment");
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const response = await helper.getOneById(Appointment, req);
    if (response.error) {
      return res.status(404).send(response.error);
    }
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while getting an appointment");
  }
};

const putAnAppointment = async (req, res) => {
  try {
    const response = await helper.updateOne(Appointment, req);
    if (response.error) {
      return res.status(404).send(response.error);
    }
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while updating an appointment");
  }
};

const deleteAnAppointment = async (req, res) => {
  try {
    const response = await helper.deleteOne(Appointment, req);
    if (response.error) {
      return res.status(404).send(response.error);
    }
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while deleting an appointment");
  }
};

module.exports = {
  getAppointments,
  postAnAppointment,
  getAppointmentById,
  putAnAppointment,
  deleteAnAppointment,
};

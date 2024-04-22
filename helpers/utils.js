const { Client, Service } = require("../models");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
function getPaginationParameters(req) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
async function getAllDocumentsFromCollection(model, skip, limit) {
  let data;
  switch (model.modelName) {
    case "Appointment":
      data = await model
        .find()
        .populate("client service")
        .skip(skip)
        .limit(limit);
      break;
    case "Client":
      data = await model.find().populate("truck").skip(skip).limit(limit);
      break;
    default:
      data = await model.find().skip(skip).limit(limit);
  }
  return data;
}
async function getOneDocumentFromCollection(model, json) {
  const { id } = json.query;
  let data;
  switch (model.modelName) {
    case "Appointment":
      data = await model.findById(id).populate("client service");
      break;
    case "Client":
      data = await model.findById(id).populate("truck");
      break;
    default:
      data = await model.findById(id);
  }
  return data;
}

const postChildreenFromParent = async (model, req, session) => {
  session.startTransaction();
  const { startTime, endTime, client: clientData } = req.body;
  const { service } = req.query;

  let parent;
  let appointmentData;
  let serviceId;
  try {
    switch (model.modelName) {
      case "Appointment":
        if (startTime >= endTime) {
          throw new Error("Start time must be before end time");
        }

        appointmentData = {
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          status: "pending",
        };

        parent = await model.create([appointmentData], { session });

        if (clientData) {
          const newClientId = new ObjectID();
          clientData._id = newClientId;
          await Client.create([clientData], { session });

          await model.updateOne(
            { _id: parent[0]._id },
            { client: newClientId },
            { session }
          );
        }

        serviceId = await Service.findOne({ name: service }).select("_id");
        await model.updateOne(
          { _id: parent[0]._id },
          { service: serviceId },
          { session }
        );

        await session.commitTransaction();
        return parent;

      case "Client":
        parent = await model.create([req.body], { session });
        await session.commitTransaction();
        return parent;

      default:
        throw new Error("Model not found");
    }
  } catch (error) {
    await session.abortTransaction();
    console.error(`Error creating ${model.modelName}:`, error);
    return { error: error.message };
  } finally {
    session.endSession();
  }
};
const deleteParentAndChildren = async (model, req, session) => {
  session.startTransaction();
  let deletedAppointments;
  let clientId;
  let one;

  try {
    switch (model.modelName) {
      case "Appointment":
        deletedAppointments = await model.findByIdAndDelete(req.query.id, {
          session,
        });

        clientId = deletedAppointments.client;
        one = await Client.findById(clientId);
        console.log("🚀 ~ deleteParentAndChildren ~ one:", one);
        if (clientId) {
          await Client.findByIdAndDelete(clientId, { session });
        }
        break;

      default:
        throw new Error("Model not found");
    }

    await session.commitTransaction();
    return {
      success: true,
      message: "Parent and its children deleted successfully",
    };
  } catch (error) {
    await session.abortTransaction();
    console.error("Error deleting parent and its children:", error);
    return { error: error.message };
  } finally {
    session.endSession();
  }
};
const putChildreenFromParent = async (model, req, session) => {
  session.startTransaction();
  const { id } = req.params;
  const { startTime, endTime, client: clientData } = req.body;
  const { service } = req.query;
  let appointmentData;
  let serviceId;
  try {
    switch (model.modelName) {
      case "Appointment":
        if (startTime >= endTime) {
          throw new Error("Start time must be before end time");
        }

        appointmentData = {
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          status: "pending",
        };

        await model.findByIdAndUpdate(id, appointmentData, { session });

        if (clientData) {
          const newClient = await Client.create([clientData], { session });
          await model.findByIdAndUpdate(
            id,
            { client: newClient._id },
            { session }
          );
        }

        serviceId = await Service.findOne({ name: service }).select("_id");
        await model.findByIdAndUpdate(id, { service: serviceId }, { session });
        break;

      case "Client":
        await model.findByIdAndUpdate(id, req.body, { session });
        break;

      default:
        throw new Error("Model not found");
    }

    await session.commitTransaction();
    return {
      success: true,
      message: `${model.modelName} updated successfully`,
    };
  } catch (error) {
    await session.abortTransaction();
    console.error(`Error updating ${model.modelName}:`, error);
    return { error: error.message };
  } finally {
    session.endSession();
  }
};

module.exports = {
  getPaginationParameters,
  getAllDocumentsFromCollection,
  getOneDocumentFromCollection,
  postChildreenFromParent,
  deleteParentAndChildren,
  putChildreenFromParent,
};

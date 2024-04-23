const {
  getAllDocumentsFromCollection,
  getOneDocumentFromCollection,
  postChildreenFromParent,
  deleteParentAndChildren,
  putChildreenFromParent,
} = require("./utils");
const mongoose = require("mongoose");
const getAll = async (model, skip, limit, page) => {
  try {
    const data = await getAllDocumentsFromCollection(model, skip, limit);
    const total = await model.countDocuments();

    return {
      total,
      count: data.length,
      data,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching appointment datas:", error);
    return { error: error.message };
  }
};
const getOneById = async (model, json) => {
  const { id } = json.query;
  try {
    const data = await getOneDocumentFromCollection(model, json);

    if (!data || data.length === 0) {
      return { error: `${model.modelName} with ID ${id} not found` };
    }
    return data;
  } catch (error) {
    console.error(`Error fetching ${model.modelName} with ID ${id}:`, error);
    return { error: error.message };
  }
};
const postOne = async (model, req) => {
  try {
    const session = await mongoose.startSession();
    return await postChildreenFromParent(model, req, session);
  } catch (error) {
    console.error(`Error creating ${model.modelName}:`, error);
    return { error: error.message };
  }
};


const deleteOne = async (model, json) => {
  const { id } = json.query;
  try {
    const session = await mongoose.startSession();
    return await deleteParentAndChildren(model, json, session);
  } catch (error) {
    console.error(`Error deleting ${model.modelName} with ID ${id}:`, error);
    return { error: error.message };
  }
};
const updateOne = async (model, json) => {
  const { id } = json.query;
  try {
    const session = await mongoose.startSession();
    const data = await putChildreenFromParent(model, json, session);
    return data;
  } catch (error) {
    console.error(`Error updating ${model.modelName} with ID ${id}:`, error);
    return { error: error.message };
  }
};

module.exports = { getAll, getOneById, postOne, deleteOne, updateOne };

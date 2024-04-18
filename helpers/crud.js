const { getPaginationParameters } = require("./utils");

const getAll = async (model, req) => {
  const { page, limit, skip } = getPaginationParameters(req);
  try {
    const data = await model.find().skip(skip).limit(limit);

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
    try {
      const { id } = json.query;
      const data = await model.findById(id);
        if (!data) {
        return { error: `${model.modelName} with ID ${json.query.id} not found` };
      }
      return data;
    } catch (error) {
      console.error(`Error fetching ${model.modelName} with ID ${json.query.id}:`, error);
      return { error: error.message };
    }
  };
const postOne = async (model, req) => {
  try {
    const data = await model.create(req.body);
    return data;
  } catch (error) {
    console.error(`Error creating ${model}:`, error);
    return { error: error.message };
  }
};
const deleteOne = async (model,json) => {
  const { id } = json.query;
  try {
    const deletedDocument = await model.findByIdAndDelete(id);
    if (!deletedDocument) {
      return { error: `${model.modelName} with ID ${id} not found` };
    }
    return deletedDocument;
  } catch (error) {
    console.error(`Error deleting ${model.modelName} with ID ${id}:`, error);
    return { error: error.message };
  }
};
const updateOne = async (model, json) => {
  const { id } = json.query;
  try {
    const data = await model.findByIdAndUpdate(id, json.body, { new: true });
    if (!data) {
      return { error: `${model.modelName} with ID ${id} not found` };
    }
    return data;
  } catch (error) {
    console.error(`Error updating ${model.modelName} with ID ${id}:`, error);
    return { error: error.message };
  }
}

module.exports = { getAll, getOneById, postOne, deleteOne, updateOne };

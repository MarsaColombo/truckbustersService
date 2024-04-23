const { getAll, getOneById, postOne, deleteOne, updateOne } = require("./crud");
const { getPaginationParameters } = require("./utils");

module.exports = {
  getAll,
  postOne,
  updateOne,
  getOneById,
  deleteOne,
  getPaginationParameters
};

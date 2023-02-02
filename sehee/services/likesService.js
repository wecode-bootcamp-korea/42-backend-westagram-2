const likesDao = require("../models/likesDao");

const createLike = async (postId, userId) => {
  try {
    return await likesDao.createLike(postId, userId);
  } catch (err) {
    const error = new Error("INVALID_DATA");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  createLike,
};

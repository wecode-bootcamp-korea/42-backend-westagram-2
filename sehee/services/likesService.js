const likesDao = require("../models/likesDao");

const createLike = async (postId, userId) => {
  return await likesDao.createLike(postId, userId);
};

module.exports = {
  createLike,
};

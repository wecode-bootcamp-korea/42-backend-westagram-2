const likeDao = require('../models/likeDao');

const createLike = async (postId, userId) => {
  return await likeDao.makeLike(postId, userId);
};

module.exports = {
  createLike,
};

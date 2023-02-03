const likeService = require('../services/likeService');
const { checkError } = require('../middleware/errorHandler');

const createLike = checkError(async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await likeService.createLike(postId, req.user);

  res.status(201).json({ message: 'likeCreated' });
});

module.exports = {
  createLike,
};

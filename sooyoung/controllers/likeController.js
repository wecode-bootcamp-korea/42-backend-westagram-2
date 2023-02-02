const likeService = require('../services/likeService');
const { checkError } = require('../middleware/errorHandler');

const createLike = checkError(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  if (!postId || !userId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await likeService.createLike(postId, userId);

  res.status(201).json({ message: 'likeCreated' });
});

module.exports = {
  createLike,
};

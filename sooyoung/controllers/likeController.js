const likeService = require('../services/likeService');

const createLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await likeService.createLike(postId, userId);

    res.status(201).json({ message: 'likeCreated' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createLike,
};

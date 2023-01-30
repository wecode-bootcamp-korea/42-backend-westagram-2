const likesService = require("../services/likesService");

const createLike = async (req, res) => {
  const { postId, userId } = req.params;
  await likesService.createLike(postId, userId);
  return res.status(201).json({ message: "likeCreated" });
};

module.exports = {
  createLike,
};

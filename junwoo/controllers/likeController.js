const likeService = require("../services/likeService");

const likeUp = async (req, res) => {
  const { userId, postId } = req.body;
  await likeService.likeUp(userId, postId);
  return res.status(201).json({ message: "likeCreated" });
};

module.exports = {
  likeUp,
};

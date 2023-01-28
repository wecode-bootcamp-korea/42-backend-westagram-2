const likesService = require("../services/likesService");

const likespost = async (req, res) => {
  const { postId, userId } = req.params;
  await likesService.likespost(postId, userId);
  return res.status(201).json({ message: "likeCreated" });
};

module.exports = {
  likespost,
};

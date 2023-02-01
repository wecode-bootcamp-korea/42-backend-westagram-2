const likesService = require("../services/likesService");

const createLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    if (!postId || !userId) {
      return res.status(400).json({ message: "INVALID_DATA_INPUT" });
    }
    await likesService.createLike(postId, userId);
    return res.status(201).json({ message: "likeCreated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLike,
};

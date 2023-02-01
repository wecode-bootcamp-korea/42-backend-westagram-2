const likeService = require("../services/likeService");

const createLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      throw new Error("Key Error!");
    }
    await likeService.createLike(userId, postId);
    return res.status(201).json({ message: "likeCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  createLike,
};

//controller/postController.js

const postService = require("../services/postService");

const postUp = async (req, res) => {
  try {
    const { title, content, image, user_id } = req.body;
    if (!title || !content || !image || !user_id) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.postUp(title, content, image, user_id);

    res.status(201).json({ message: "POSTUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const usersPost = async (req, res) => {
  const { userId } = req.params;
  const posts = await postService.usersPost(userId); // == [{}, {}, {}]
  res.status(200).json({ data: posts });
};

const postOfUser = async (req, res) => {
  const { userId } = req.params;
  const posts2 = await postService.postOfUser(userId);
  res.status(200).json({ data: posts2 });
};

const postModified = async (req, res) => {
  const { userId, postId } = req.params;
  const { content } = req.body;
  const update = await postService.postModified(userId, postId, content);
  res.status(200).json({ update });
};

const postDeleted = async (req, res) => {
  const { postId } = req.params;
  await postService.postDeleted(postId);
  res.status(201).json({ message: "postingDeleted" });
};

module.exports = {
  postUp,
  usersPost,
  postOfUser,
  postModified,
  postDeleted,
};

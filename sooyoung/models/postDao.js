const { appDataSource } = require('./dbEnvironment');

const createPost = async (postImage, content, title, userId) => {
  try {
    const newPost = await appDataSource.query(
      `INSERT INTO posts (
        post_image,
        content,
        title,
        user_id
      ) VALUES (?, ?, ?, ?);
      `,
      [postImage, content, title, userId]
    );
    return newPost;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getPostlist = async () => {
  try {
    const postList = await appDataSource.query(
      `SELECT 
          users.id AS userId, 
          users.profile_image AS userProfileImage,
          posts.id AS postingId,
          posts.post_image AS postingImageUrl,
          posts.content AS postingContent
        FROM posts
        INNER JOIN users ON users.id = posts.user_id;
      `
    );
    return postList;
  } catch (err) {
    const error = new Error('INVALID_DATA');
    error.statusCode = 500;
    throw error;
  }
};

const getUserPost = async (userId) => {
  try {
    const userWithPost = await appDataSource.query(
      `SELECT 
          id AS userId, 
          profile_image AS userProfileImage
        FROM users
        WHERE id = ?;
      `,
      [userId]
    );

    const postsOfUser = await appDataSource.query(
      `SELECT
          id AS postingId,
          post_image AS postingImageUrl,
          content AS postingContent
        FROM posts
        WHERE user_id = ?;
      `,
      [userId]
    );

    userWithPost[0].posting = postsOfUser;
    return userWithPost[0];
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const updatePost = async (postId, content, userId) => {
  try {
    await appDataSource.query(
      `UPDATE posts
          SET content = ?
          WHERE id = ? AND user_id = ? ;
        `,
      [content, postId, userId]
    );

    const updatedPost = await appDataSource.query(
      `SELECT 
          users.id AS userId,
          users.username AS username,
          posts.id AS postingId,
          posts.title AS postingTitle,
          posts.content AS postingContent
        FROM posts
        INNER JOIN users ON users.id = posts.user_id
        WHERE posts.id = ?;
        `,
      [postId]
    );

    return updatedPost;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const removePost = async (postId, userId) => {
  try {
    const removePost = await appDataSource.query(
      `DELETE FROM posts
      WHERE id = ? AND user_id = ? ;
      `,
      [postId, userId]
    );

    return removePost;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  getPostlist,
  getUserPost,
  updatePost,
  removePost,
};

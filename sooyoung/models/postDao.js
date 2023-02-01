const { appDataSource } = require('./dbEnvironment');

const createPost = async (postImage, content, title, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts (
        post_image,
        content,
        title,
        user_id
      ) VALUES (?, ?, ?, ?);
      `,
      [postImage, content, title, userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getPosts = async () => {
  try {
    return await appDataSource.query(
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
  } catch (err) {
    const error = new Error('INVALID_DATA');
    error.statusCode = 500;
    throw error;
  }
};

const getPostsByUserId = async (userId) => {
  try {
    const [userWithPost] = await appDataSource.query(
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

    userWithPost.posting = postsOfUser;
    return userWithPost;
  } catch (err) {
    console.log(err);
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
    console.log(err);
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

    if (!removePost.affectedRows) {
      throw new Error('NO_POST_FOUND');
    }
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw err;
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  updatePost,
  removePost,
};

const { appDataSource } = require("./appDataSource");

const createLike = async (postId, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO likes (
              postId, userId
              )
              VALUES (?, ?);`,
      [postId, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createLike,
};

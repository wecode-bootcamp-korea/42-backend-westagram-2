const { appDataSource } = require("./appDataSource");

const createLike = async (postId, userId) => {
  return await appDataSource.query(
    `INSERT INTO likes (
              postId, userId
              )
              VALUES (?, ?);`,
    [postId, userId]
  );
};

module.exports = {
  createLike,
};

const { appDataSource } = require('./dbEnvironment');

const makeLike = async (postId, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO likes (
          user_id,
          post_id
        )
        VALUES ( ?, ? );
      `,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  makeLike,
};

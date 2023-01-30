const { appDataSource } = require('./dbEnvironment');

const createUser = async (username, email, profileImage, password) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users (
        username, 
        email, 
        profile_image,
        password
      ) VALUES (?, ?, ?, ?);
      `,
      [username, email, profileImage, password]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};

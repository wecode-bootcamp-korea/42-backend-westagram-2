const { appDataSource } = require("./dbconfig.js");

const createUser = async (name, email, password, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        profileIamge
      ) VALUES (?,
        ?,
        ?,
        ?);`,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
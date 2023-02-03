const { appDataSource } = require("./appDataSource");

const signUp = async (name, email, password, phoneNumber, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        phoneNumber,
        profileImage
    ) VALUES (?, ?, ?, ?, ?);
  `,
      [name, email, password, phoneNumber, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const checkIfUserExistsOrNot = async (userId) => {
  try {
    const user = await appDataSource.query(
      `SELECT EXISTS(
      SELECT
      id
      FROM users 
      WHERE
      id = ?
    );`,
      [userId]
    );
    const userExists = Object.values(user[0])[0];
    if (!userExists) {
      throw new Error("INVALID_USER");
    }
    return userExists;
  } catch (err) {
    const error = new Error("INVALID_DATA");
    error.statusCode = 500;
    throw error;
  }
};

const getUserInformation = async (userId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT * FROM users
    WHERE 
    id = ?;`,
      [userId]
    );
    if (!result) {
      const err = new Error("INVALID_USER");
      throw err;
    }
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA");
    err.statusCode = 400;
    throw err;
  }
};
module.exports = {
  signUp,
  checkIfUserExistsOrNot,
  getUserInformation,
};

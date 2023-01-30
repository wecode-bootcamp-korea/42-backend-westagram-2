const { appDataSource } = require("./appDataSource");

// 유저회원가입
const signUp = async (name, password, email, phoneNumber, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
    name,
    password,
    email,
    phoneNumber,
    profileImage
    ) VALUES (?, ?, ?, ?, ?);
  `,
      [name, password, email, phoneNumber, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  signUp,
};

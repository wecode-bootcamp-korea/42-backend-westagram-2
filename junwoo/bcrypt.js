const bcrypt = require("bcrypt");

const password = "password";
const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const hashPassword = async () => {
  const hashedPassword = await makeHash(password, saltRounds);
};

hashPassword();
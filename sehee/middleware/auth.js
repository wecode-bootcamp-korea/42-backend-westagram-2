const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("NEED_ACCESS_TOKEN");
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new Error("INVALID_ACCESS_TOKEN");
    }

    const tokenId = decoded.userId;
    req.user = await userDao.getUserInformation(tokenId);
    return next();
  } catch (err) {
    err.statusCode = 500 || statusCode;
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  validateToken,
};

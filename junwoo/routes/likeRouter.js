const express = require("express");
const likeController = require("../controllers/likeController.js");

const router = express.Router();

router.post("/likeup", likeController.createLike);

module.exports = {
  router,
};

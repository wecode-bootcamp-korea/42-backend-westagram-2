const express = require("express");
const likesController = require("../controllers/likesController");

const router = express.Router();

router.post("/:postId/:userId", likesController.createLike);

module.exports = {
  router,
};

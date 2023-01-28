const express = require("express");
const likesController = require("../controllers/likesController");

const router = express.Router();

router.post("/:postId/:userId", likesController.likespost);

module.exports = {
  router,
};

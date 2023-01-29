const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/:postId', likeController.createLike);

module.exports = {
  router,
};

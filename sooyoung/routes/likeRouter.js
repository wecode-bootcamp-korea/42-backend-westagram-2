const express = require('express');
const likeController = require('../controllers/likeController');
const { validateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/post/:postId', validateToken, likeController.createLike);

module.exports = {
  router,
};

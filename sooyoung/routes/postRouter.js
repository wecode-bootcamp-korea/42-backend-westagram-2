const express = require('express');
const postController = require('../controllers/postController');
const { validateToken } = require('../middleware/auth');

const router = express.Router();

router.post('', validateToken, postController.createPost);
router.get('/lists', postController.getPosts);
router.get('/user/:userId', postController.getPostsByUserId);
router.patch('/:postId', postController.patchPost);
router.delete('/:postId', postController.deletePost);

module.exports = {
  router,
};

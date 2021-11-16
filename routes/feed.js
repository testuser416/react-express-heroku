const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');

router.get('/getPosts',feedController.getPosts);
router.post('/createPosts',feedController.createPosts);
router.get('/singlePosts/:postId',feedController.singlePost);
router.delete('/deletePost/:postId',feedController.deletePost);
router.put("/updatePost/:postId",feedController.updatePost);
module.exports = router;
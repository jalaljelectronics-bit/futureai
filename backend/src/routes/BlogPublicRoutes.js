const express = require('express');
const { getPublishedBlogPosts, getPublishedBlogPostBySlug } = require('../controllers/blogController');

const router = express.Router();

router.get('/', getPublishedBlogPosts);
router.get('/:slug', getPublishedBlogPostBySlug);

module.exports = router;
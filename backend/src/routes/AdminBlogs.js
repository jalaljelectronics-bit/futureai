const express = require('express');
const requireAdmin = require('../middleware/requireAdmin');
const {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');

const router = express.Router();

router.get('/', requireAdmin, getAllBlogPosts);
router.get('/:id', requireAdmin, getBlogPostById);
router.post('/', requireAdmin, createBlogPost);
router.put('/:id', requireAdmin, updateBlogPost);
router.delete('/:id', requireAdmin, deleteBlogPost);

module.exports = router;
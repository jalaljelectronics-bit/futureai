const express = require('express');
const requireAdmin = require('../middleware/requireAdmin');
const {
  getAllSuccessStories,
  getSuccessStoryById,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} = require('../controllers/successStoryController');

const router = express.Router();

router.get('/', requireAdmin, getAllSuccessStories);
router.get('/:id', requireAdmin, getSuccessStoryById);
router.post('/', requireAdmin, createSuccessStory);
router.put('/:id', requireAdmin, updateSuccessStory);
router.delete('/:id', requireAdmin, deleteSuccessStory);

module.exports = router;
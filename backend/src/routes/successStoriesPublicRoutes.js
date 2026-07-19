const express = require('express');
const { getPublicSuccessStories } = require('../controllers/successStoryController');

const router = express.Router();

router.get('/', getPublicSuccessStories);

module.exports = router;

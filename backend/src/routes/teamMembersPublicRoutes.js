const express = require('express');
const { getPublicTeamMembers } = require('../controllers/TeammemberController');

const router = express.Router();

router.get('/', getPublicTeamMembers);

module.exports = router;

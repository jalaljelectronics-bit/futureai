const express = require('express');
const { getPublicTeamMembers } = require('../controllers/teamMemberController');

const router = express.Router();

router.get('/', getPublicTeamMembers);

module.exports = router;

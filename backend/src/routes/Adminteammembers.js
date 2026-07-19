const express = require('express');
const requireAdmin = require('../middleware/requireAdmin');
const createUploader = require('../middleware/upload');
const uploadTeamPhoto = createUploader('team-members');

const {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamMemberController');

const router = express.Router();

router.get('/', requireAdmin, getAllTeamMembers);
router.get('/:id', requireAdmin, getTeamMemberById);
router.post('/', requireAdmin, uploadTeamPhoto.single('photo'), createTeamMember);
router.put('/:id', requireAdmin, uploadTeamPhoto.single('photo'), updateTeamMember);
router.delete('/:id', requireAdmin, deleteTeamMember);

module.exports = router;
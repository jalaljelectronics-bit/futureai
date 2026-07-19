const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const requireAdmin = require('../middleware/requireAdmin');

// every route below requires a valid admin JWT
router.use(requireAdmin);

router.get('/', announcementController.getAllAnnouncements);
router.post('/', announcementController.createAnnouncement);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
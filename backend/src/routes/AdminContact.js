const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const requireAdmin = require('../middleware/requireAdmin');

// every route below requires a valid admin JWT
router.use(requireAdmin);

router.get('/', contactController.getAllSubmissions);
router.put('/:id', contactController.updateSubmission);
router.delete('/:id', contactController.deleteSubmission);

module.exports = router;
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const validate = require('../middleware/validate');
const courseSchema = require('../schemas/courseSchema');
const requireAdmin = require('../middleware/requireAdmin');
const createUploader = require('../middleware/upload');
const uploadCourseThumbnail = createUploader('courses');

// every route below requires a valid admin JWT
router.use(requireAdmin);

// Multipart form fields all arrive as strings, and courseOutline (a nested
// object) has to travel as a JSON string over FormData — this converts
// both back to real types before Zod sees them. Also pulls the uploaded
// file's Cloudinary URL onto req.body.thumbnailImage, since multer puts
// it on req.file, not req.body, and validate() only reads req.body.
function normalizeMultipartCourseBody(req, res, next) {
  if (req.file) {
    req.body.thumbnailImage = req.file.path;
  }
  if (req.body.isActive !== undefined) {
    req.body.isActive = req.body.isActive === 'true' || req.body.isActive === true;
  }
  if (typeof req.body.courseOutline === 'string') {
    try {
      req.body.courseOutline = JSON.parse(req.body.courseOutline);
    } catch (err) {
      delete req.body.courseOutline;
    }
  }
  next();
}

router.post(
  '/',
  uploadCourseThumbnail.single('thumbnailImage'),
  normalizeMultipartCourseBody,
  validate(courseSchema),
  courseController.createCourse
);
router.put(
  '/:id',
  uploadCourseThumbnail.single('thumbnailImage'),
  normalizeMultipartCourseBody,
  validate(courseSchema),
  courseController.updateCourse
);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;

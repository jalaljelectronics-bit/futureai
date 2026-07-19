const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Factory so each entity type gets its own folder in Cloudinary.
function createUploader(folder) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `future-ai-skills/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB cap
  });
}

module.exports = createUploader;
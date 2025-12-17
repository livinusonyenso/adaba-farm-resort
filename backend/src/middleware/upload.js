const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Ensure uploads directory exists
if (!fs.existsSync(config.UPLOAD.DIR)) {
  fs.mkdirSync(config.UPLOAD.DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.UPLOAD.DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const fileFilter = (req, file, cb) => {
  if (config.UPLOAD.ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: config.UPLOAD.MAX_SIZE }
});

module.exports = upload;

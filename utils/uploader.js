const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageFormats = [".jpg", ".jpeg", ".png", ".webp"];
const videoFormats = [".mp4", ".avi", ".mov", ".mkv", ".webm"];
const validFormats = [...imageFormats, ...videoFormats];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    let dir;
    if (imageFormats.includes(ext)) {
      dir = "covers";
    } else if (videoFormats.includes(ext)) {
      dir = "videos";
    } else {
      dir = "uploads";
    }
    const fullDir = path.join(__dirname, "..", "public", "course", dir);
    fs.mkdirSync(fullDir, { recursive: true });
    cb(null, fullDir);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + Math.round(Math.random() * 100);
    const ext = path.extname(file.originalname);
    if (validFormats.includes(ext.toLowerCase())) {
      cb(null, `${filename}${ext}`);
    } else {
      cb(new Error(`Only ${validFormats.join(", ")} are valid file types!`));
    }
  },
});

const maxSize = 100 * 1000 * 1000; // 100MB

const uploader = multer({
  storage,
  limits: {
    fileSize: maxSize,
  },
});

module.exports = uploader;

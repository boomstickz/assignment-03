const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// only images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });

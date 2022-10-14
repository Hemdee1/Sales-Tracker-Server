const multer = require("multer");

const storage = multer.diskStorage({
  // destination for file
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  // filename
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      console.log("only jpg and png files allow");
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

module.exports = upload;

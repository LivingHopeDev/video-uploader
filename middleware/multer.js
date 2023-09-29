const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FILE_TYPE = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogg",
  "video/avi": "avi",
  "video/mkv": "mkv",
  "video/quicktime": "mov",
  "video/x-ms-wmv": "wmv",
  "video/x-flv": "flv",
  "video/mpeg": "mpeg",
  "video/3gpp": "3gp",
};

const Storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    const videoExist = path.join(__dirname, `../uploads/${fileName}`);
    fs.stat(videoExist, (err, stat) => {
      if (err == null) {
        return cb(new Error("File name already exist", false));
      }
      cb(null, `${fileName}`);
    });
  },
});
const fileFilter = (req, file, cb) => {
  const isValid = FILE_TYPE[file.mimetype];

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};
const upload = multer({
  storage: Storage,
  fileFilter: fileFilter,
});

module.exports = upload;

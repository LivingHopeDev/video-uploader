const path = require("path");
const fs = require("fs");

const uploadVideo = async (req, res) => {
  res.status(200).json({ staus: "Success", message: "Video uploaded" });
};

const getVideo = async (req, res) => {
  const { name } = req.params;

  const videoPath = path.join(__dirname, `../uploads/${name}`);
  fs.stat(videoPath, (err, stat) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.status(404).json({ staus: "Failed", message: "Video not found" });
      } else {
        res
          .status(500)
          .json({ staus: "Failed", message: "Internal Server Error" });
      }
    } else {
      res.sendFile(videoPath);
    }
  });
};
const getAllVideo = async (req, res) => {
  const videoPath = path.join(__dirname, "../uploads");
  fs.readdir(videoPath, (err, videos) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ message: videos });
  });
};
module.exports = { uploadVideo, getVideo, getAllVideo };

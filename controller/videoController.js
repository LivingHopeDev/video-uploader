const path = require("path");
const fs = require("fs");

const uploadVideo = async (req, res) => {
  const fileName = req.file.filename;
  if (!req.file) {
    return res.status(400).json({
      status: "Failed",
      message: "No file was uploaded.",
    });
  }
  res.status(200).json({
    staus: "Success",
    message: "Video uploaded",
    url: `${req.protocol}://${req.hostname}/api/video/${fileName}`,
    // url: `${req.protocol}://${req.hostname}:5000/api/video/${fileName}`,
  });
};

const getVideo = async (req, res) => {
  const { name } = req.params;

  const videoPath = path.join(__dirname, `../uploads/${name}`);
  fs.stat(videoPath, (err, stat) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.status(404).json({ status: "Failed", message: "Video not found" });
      } else {
        res
          .status(500)
          .json({ status: "Failed", message: "Internal Server Error" });
      }
    } else {
      const videoSize = fs.statSync(videoPath).size;
      const fileExtension = name.split(".")[1];

      const range = req.headers.range;
      if (range) {
        const chunkSize = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start} - ${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": `video/${fileExtension}`,
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
      } else {
        const headers = {
          "Content-Length": videoSize,
          "Content-Type": `video/${fileExtension}`,
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath);
        videoStream.pipe(res);
      }
    }
  });
};
const getAllVideo = async (req, res) => {
  const videoPath = path.join(__dirname, "../uploads");
  fs.readdir(videoPath, (err, videos) => {
    if (err) {
      console.log(err);
    }
    if (videos.length === 0) {
      return res.status(200).json({ message: "No uploaded video yet" });
    }
    const videoUrl = videos.map(
      (video) => `${req.protocol}://${req.hostname}/api/video/${video}`
    );
    res.status(200).json({ message: videoUrl });
  });
};
module.exports = { uploadVideo, getVideo, getAllVideo };

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Route = require("./Route/uploadRoute");
const multer = require("multer");
const port = process.env.PORT || process.env.NODE_ENV;

const app = express();

app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/video", Route);

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found" });
});
app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).send({ message: err.message });
  } else if (err) {
    return res.status(400).send({ message: err.message });
  }
  next();
});
app.listen(port, () => {
  console.log("sever running on port", port);
});

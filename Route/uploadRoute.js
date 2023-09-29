const { Router } = require("express");
const router = Router();
const {
  uploadVideo,
  getVideo,
  getAllVideo,
} = require("../controller/videoController");
const upload = require("../middleware/multer");

router.route("/").get(getAllVideo);
router.route("/:name").get(getVideo);
router.route("/upload").post(upload.single("video"), uploadVideo);

module.exports = router;

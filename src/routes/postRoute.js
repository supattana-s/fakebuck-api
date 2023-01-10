const express = require("express");

const upload = require("../middleware/upload");

const postController = require("../controllers/postController");

const router = express.Router();

router.route("/").post(upload.single("image"), postController.createPost);

module.exports = router;

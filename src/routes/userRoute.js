const express = require("express");

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const upload = require("../middleware/upload");

const router = express.Router();

router.patch(
    "/",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    userController.updateUser
);

router.get("/:id/friends", userController.getUserFriends);

router.get("/:id/posts", postController.getUserPost);

module.exports = router;

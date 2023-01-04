const express = require("express");

const userCotroller = require("../controllers/userController");
const upload = require("../middleware/upload");

const router = express.Router();

router.patch(
    "/",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    userCotroller.updateUser
);

router.get("/:id/friends", userCotroller.getUserFriends);

module.exports = router;

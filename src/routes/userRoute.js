const express = require("express");

const authenticate = require("../middleware/authenticate");
const userCotroller = require("../controllers/userController");
const upload = require("../middleware/upload");

const router = express.Router();

router.patch(
    "/",
    authenticate,
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    userCotroller.updateUser
);

module.exports = router;

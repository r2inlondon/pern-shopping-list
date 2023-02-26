const express = require("express");
const router = express.Router();

const handleRefreshToken = require("../controllers/refreshTokenController");

const {
  login,
  registerUser,
  deleteUser,
} = require("../controllers/authController");

// User Routes
router.post("/", login);
router.post("/register", registerUser);
router.post("/refreshToken", handleRefreshToken);
router.delete("/delete", deleteUser);

module.exports = router;

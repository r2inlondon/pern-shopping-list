const express = require("express");
const router = express.Router();

const handleRefreshToken = require("../controllers/refreshTokenController");

const {
  login,
  logout,
  registerUser,
  deleteUser,
} = require("../controllers/authController");

// User Routes
router.post("/", login);
router.post("/register", registerUser);
router.get("/refreshToken", handleRefreshToken);
router.post("/logout", logout);
router.delete("/delete", deleteUser);

module.exports = router;

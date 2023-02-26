const express = require("express");
const router = express.Router();

const refreshToken = require("../controllers/refreshToken");

const {
  login,
  registerUser,
  deleteUser,
} = require("../controllers/authController");

// User Routes
router.post("/", login);
router.post("/register", registerUser);
router.post("/refreshToken", refreshToken);
router.delete("/delete", deleteUser);

module.exports = router;

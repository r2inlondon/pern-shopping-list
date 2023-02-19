const express = require("express");
const router = express.Router();

const {
  login,
  registerUser,
  deleteUser,
  refreshToken,
} = require("../controllers/authController");

// User Routes
router.post("/", login);
router.post("/new", registerUser);
router.post("/refreshToken", refreshToken);
router.delete("/:email", deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  login,
  registerUser,
  deleteUser,
} = require("../controllers/authController");

// User Routes
router.post("/", login);
router.post("/new", registerUser);
router.delete("/:email", deleteUser);

module.exports = router;

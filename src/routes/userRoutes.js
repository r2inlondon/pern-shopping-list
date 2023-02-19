const express = require("express");
const router = express.Router();

const {
  getUser,
  registerUser,
  deleteUser,
} = require("../controllers/userController");

// User Routes
router.post("/", getUser);
router.post("/new", registerUser);
router.delete("/:email", deleteUser);

module.exports = router;

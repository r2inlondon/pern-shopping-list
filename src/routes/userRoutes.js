const express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/userController");

// User Routes
router.get("/", getUser);
router.post("/new", createUser);
router.delete("/", deleteUser);

module.exports = router;

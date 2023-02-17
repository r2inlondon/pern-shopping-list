const express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/userController");

// User Routes
router.get("/:email", getUser);
router.post("/new", createUser);
router.delete("/:email", deleteUser);

module.exports = router;

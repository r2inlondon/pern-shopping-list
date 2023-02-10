const express = require("express");
const router = express.Router();

const {
  findUser,
  createUser,
  deleteUser,
} = require("../../controllers/userController");

// Routes
router.get("/", findUser);
router.post("/new", createUser);
router.delete("/", deleteUser);

module.exports = router;

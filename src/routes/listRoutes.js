const express = require("express");
const router = express.Router();
const { getLists } = require("../controllers/listController");

// List routes
router.get("/", getLists);

module.exports = router;

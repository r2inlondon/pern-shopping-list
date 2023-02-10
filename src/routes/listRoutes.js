const express = require("express");
const router = express.Router();
const { getLists, newList } = require("../controllers/listController");

// List routes
router.get("/", getLists);
router.post("/new", newList);

module.exports = router;

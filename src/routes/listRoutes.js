const express = require("express");
const router = express.Router();
const {
  getLists,
  newList,
  deleteList,
} = require("../controllers/listController");

// List routes
router.get("/", getLists);
router.post("/new", newList);
router.delete("/", deleteList);

module.exports = router;

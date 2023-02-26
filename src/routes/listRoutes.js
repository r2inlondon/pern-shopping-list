const express = require("express");
// const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = express.Router();
const {
  getLists,
  newList,
  deleteList,
} = require("../controllers/listController");

// List routes
// router.get("/", isAuthenticated, getLists);
// router.post("/new", isAuthenticated, newList);
// router.delete("/", deleteList);

router.get("/", getLists);
router.post("/new", newList);
router.delete("/", deleteList);

module.exports = router;

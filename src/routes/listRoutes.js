const express = require("express");
// const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = express.Router();
const {
  getLists,
  newList,
  updateList,
  deleteList,
} = require("../controllers/listController");

// List routes
// router.get("/", isAuthenticated, getLists);
// router.post("/new", isAuthenticated, newList);
// router.delete("/", deleteList);

router.get("/", getLists);
router.post("/new", newList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

module.exports = router;

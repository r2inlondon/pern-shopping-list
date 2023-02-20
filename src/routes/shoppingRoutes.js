const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/isAuthenticated");
const {
  getAllProductsFromList,
  newShoppingItem,
  deleteShoppingItem,
  updateShoppingItem,
} = require("../controllers/shoppingController");

router.get("/", isAuthenticated, getAllProductsFromList);
router.post("/new", isAuthenticated, newShoppingItem);
router.put("/", isAuthenticated, updateShoppingItem);
router.delete("/", isAuthenticated, deleteShoppingItem);

module.exports = router;

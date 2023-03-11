const express = require("express");
const router = express.Router();
const {
  getAllProductsFromList,
  newShoppingItem,
  deleteShoppingItem,
  updateShoppingItem,
  deleteCompletedItems,
} = require("../controllers/shoppingController");

router.get("/:shoppingId", getAllProductsFromList);
router.post("/new", newShoppingItem);
router.put("/", updateShoppingItem);
router.delete("/", deleteShoppingItem);
router.delete("/del-completed", deleteCompletedItems);

module.exports = router;

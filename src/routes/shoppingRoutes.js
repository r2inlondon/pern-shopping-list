const express = require("express");
const router = express.Router();
const {
  getAllProductsFromList,
  newShoppingItem,
  deleteShoppingItem,
} = require("../controllers/shoppingController");

router.get("/", getAllProductsFromList);
router.post("/new", newShoppingItem);
router.delete("/", deleteShoppingItem);

module.exports = router;

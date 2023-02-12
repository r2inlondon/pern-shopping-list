const express = require("express");
const router = express.Router();
const {
  getAllProductsFromList,
  newShoppingItem,
} = require("../controllers/shoppingController");

router.get("/", getAllProductsFromList);
router.post("/new", newShoppingItem);

module.exports = router;

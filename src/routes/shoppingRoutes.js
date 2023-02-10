const express = require("express");
const router = express.Router();
const { getAllProductsFromList } = require("../controllers/shoppingController");

router.get("/", getAllProductsFromList);

module.exports = router;

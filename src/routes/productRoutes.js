const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/productController");

router.get("/", getAllProducts);
// router.post("/new", createProduct);
// router.delete("/name", deleteProduct);

module.exports = router;

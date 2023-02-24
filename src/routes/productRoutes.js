const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { getAllProducts } = require("../controllers/productController");

router.get("/", isAuthenticated, getAllProducts);
// router.post("/new", createProduct);
// router.delete("/name", deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  startsWith,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/name", startsWith);
router.get("/new", createProduct);
router.delete("/name", deleteProduct);

module.exports = router;

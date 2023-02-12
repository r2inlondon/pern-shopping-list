const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  startsWith,
  createProduct,
  deleteProduct,
  newProductInList,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/name", startsWith);
router.post("/new", createProduct);
router.post("/new/inlist", newProductInList);
router.delete("/name", deleteProduct);

module.exports = router;

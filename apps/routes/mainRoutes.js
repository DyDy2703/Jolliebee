const express = require("express");
const homeController = require("../controllers/index");
const productController = require("../controllers/productcontroller");

const router = express.Router();

// Nhom route giao dien chinh sau khi dang nhap.
router.get("/", homeController.index);
router.get("/products/category", productController.category);
router.get("/products", productController.productList);

module.exports = router;

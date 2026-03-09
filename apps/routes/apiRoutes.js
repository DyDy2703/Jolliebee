const express = require("express");
const adminController = require("../controllers/admincontroller");
const productController = require("../controllers/productcontroller");
const { requireRole } = require("../middlewares/auth");

const router = express.Router();

// API chung cho user da dang nhap.
router.get("/api/me", adminController.getMe);
router.get("/api/categories", productController.getCategories);
router.get("/api/products", productController.getProducts);

// API chi admin moi duoc phep thay doi du lieu.
router.post("/api/categories", requireRole("admin"), adminController.createCategory);
router.post("/api/products", requireRole("admin"), adminController.createProduct);
router.get("/api/users", requireRole("admin"), adminController.getUsers);

module.exports = router;

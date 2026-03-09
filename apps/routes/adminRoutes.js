const express = require("express");
const adminController = require("../controllers/admincontroller");
const { requireRole } = require("../middlewares/auth");

const router = express.Router();

// Nhom route giao dien quan tri: bat buoc role admin.
router.get("/admin/products", requireRole("admin"), adminController.manageProductsPage);
router.get("/admin/products/new", requireRole("admin"), adminController.manageProductsPage);
router.get("/admin/categories", requireRole("admin"), adminController.manageCategoriesPage);
router.get("/admin/users", requireRole("admin"), adminController.manageUsersPage);

module.exports = router;

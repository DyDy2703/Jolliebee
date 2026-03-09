const express = require("express");
const adminController = require("../controllers/admincontroller");
const { redirectIfAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Nhom route xac thuc: cho phep truy cap khi chua dang nhap.
router.get("/admin/login", redirectIfAuthenticated, adminController.login);
router.post("/admin/login", redirectIfAuthenticated, adminController.loginSubmit);
router.get("/admin/register", redirectIfAuthenticated, adminController.register);
router.post("/admin/register", redirectIfAuthenticated, adminController.registerSubmit);
router.post("/admin/logout", adminController.logout);

module.exports = router;

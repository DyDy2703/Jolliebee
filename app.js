const express = require("express");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./apps/routes/authRoutes");
const mainRoutes = require("./apps/routes/mainRoutes");
const adminRoutes = require("./apps/routes/adminRoutes");
const apiRoutes = require("./apps/routes/apiRoutes");
const { requireAuth } = require("./apps/middlewares/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "jolliebee-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 },
  })
);
app.use(express.static(path.join(__dirname, "public")));

// Cac route xac thuc (dang nhap/dang ky/dang xuat) de o nhom rieng.
app.use(authRoutes);

// Tat ca route ben duoi bat buoc phai dang nhap.
app.use(requireAuth);

// Route giao dien public sau khi dang nhap.
app.use(mainRoutes);

// Route giao dien quan tri (chi admin).
app.use(adminRoutes);

// Route API cho user/admin, gom ca phan quyen theo role.
app.use(apiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

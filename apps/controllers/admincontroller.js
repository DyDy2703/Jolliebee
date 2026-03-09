const path = require("path");
const { getDb } = require("../../config/mongo");

exports.login = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin", "login.html"));
};

exports.register = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin", "register.html"));
};

exports.loginSubmit = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.redirect(303, "/admin/login?error=missing");
  }

  try {
    const db = await getDb();
    const user = await db.collection("Jolliebee").findOne({ username, password });

    if (!user) {
      return res.redirect(303, "/admin/login?error=invalid");
    }

    req.session.user = {
      username: user.username,
      role: user.role || "user",
    };

    return res.redirect(303, "/");
  } catch (error) {
    return res.redirect(303, "/admin/login?error=db");
  }
};

exports.registerSubmit = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.redirect(303, "/admin/register?error=missing");
  }

  try {
    const db = await getDb();
    const users = db.collection("Jolliebee");
    const exists = await users.findOne({ username });

    if (exists) {
      return res.redirect(303, "/admin/register?error=exists");
    }

    await users.insertOne({
      username,
      password,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.redirect(303, "/admin/login?info=registered");
  } catch (error) {
    return res.redirect(303, "/admin/register?error=db");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect(303, "/admin/login?info=logout");
  });
};

exports.manageProductsPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin", "manage-products.html"));
};

exports.manageCategoriesPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin", "manage-categories.html"));
};

exports.manageUsersPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin", "users.html"));
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required." });
  }

  try {
    const db = await getDb();
    await db.collection("categories").insertOne({
      name,
      description: description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({ message: "Category created." });
  } catch (error) {
    return res.status(500).json({ message: "Cannot create category." });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Product name and price are required." });
  }

  try {
    const db = await getDb();
    await db.collection("products").insertOne({
      name,
      price: Number(price),
      category: category || "",
      status: "Con hang",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({ message: "Product created." });
  } catch (error) {
    return res.status(500).json({ message: "Cannot create product." });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const db = await getDb();
    const users = await db
      .collection("Jolliebee")
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Cannot load users." });
  }
};

exports.getMe = (req, res) => {
  return res.json({
    username: req.session.user.username,
    role: req.session.user.role,
  });
};

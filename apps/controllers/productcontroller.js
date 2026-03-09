const path = require("path");
const { getDb } = require("../../config/mongo");

exports.category = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "category.html"));
};

exports.productList = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "products.html"));
};

exports.getCategories = async (req, res) => {
  try {
    const db = await getDb();
    const categories = await db.collection("categories").find({}).sort({ createdAt: -1 }).toArray();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Cannot load categories." });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const db = await getDb();
    const products = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Cannot load products." });
  }
};

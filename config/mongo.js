const { MongoClient } = require("mongodb");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "Jolliebee";

let client;
let db;

async function getDb() {
  if (db) return db;

  client = new MongoClient(MONGO_URL);
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

module.exports = {
  getDb,
  DB_NAME,
};

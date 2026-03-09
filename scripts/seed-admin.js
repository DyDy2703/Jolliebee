const { getDb, DB_NAME } = require("../config/mongo");

async function seed() {
  const db = await getDb();
  const collection = db.collection("Jolliebee");

  const username = "admin";
  const password = "admin123";

  await collection.updateOne(
    { username },
    {
      $set: {
        username,
        password,
        role: "admin",
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );

  console.log(`Seeded user into DB '${DB_NAME}', collection 'Jolliebee'`);
  console.log("username: admin");
  console.log("password: admin123");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://srijitadutta025:abcdefgh@codej.t0yyah4.mongodb.net/test";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully!");
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}

run();

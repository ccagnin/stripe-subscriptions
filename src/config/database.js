const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DATABASE_URL;
const dbName = "Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connection() {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("Ping command executed successfully.");
  } finally {
    await client.close();
  }
}

module.exports = { connection };

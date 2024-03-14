const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function connectToDatabase() {
  try {
    const conn = await connection;
    console.log("Connected to the database");
    return conn;
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
}

module.exports = {
  connectToDatabase,
};

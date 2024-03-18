const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
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

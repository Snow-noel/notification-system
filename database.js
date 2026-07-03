const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
});

pool
  .connect()
  .then(() => {
    console.log("connected to notification database");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = pool;

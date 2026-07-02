const express = require("express");

const port = 3000;

const App = express();

require("dotenv").config();

App.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => {
    console.log("connected to databse");
  })
  .catch(() => {
    console.error("there was an error connecting to the database");
  });

App.post("/comments", (req, res) => {
  const { userId, text } = req.body;
  try {
    res.status(201).json({ message: "text sent successifull" });
    console.log(`UserId: ${userId} comment ${text}`);
  } catch (err) {
    res.status(500).json({ message: "error while sending text", error: err });
  }
});

App.listen(port, () => {
  console.log(`listening at port ${port}`);
});
